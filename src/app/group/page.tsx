"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Group, GroupMember, Transaction } from "./types";

function PageContent() {
  // const router = useRouter();

  // fetch userId from URL
  const searchParams = useSearchParams();
  const groupMemberId = searchParams.get("groupMemberId");

  const [error, setError] = useState<string>("");
  const [group, setGroup] = useState<Group | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);

  const [transactionTitle, setTransactionTitle] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [payerId, setPayerId] = useState<string>("");
  const [splitWithIds, setSplitWithIds] = useState<Set<string>>(new Set());

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // ----- fetching group data -----
  useEffect(() => {
    const fetchGroupWithGroupMembers = async () => {
      const res = await fetch(`api/group/${groupMemberId}`);
      const data = await res.json();

      if (data.error) {
        // TODO: add error handling
        setError(data.error);
      } else {
        setGroup(data.group);
        setGroupMembers(data.groupMembers);
      }
    };

    fetchGroupWithGroupMembers();
  }, [groupMemberId]);

  const fetchTransactions = useCallback(async () => {
    const res = await fetch(`api/transaction/${groupMemberId}`);
    const data = await res.json();

    setTransactions(data.transactions);
  }, [groupMemberId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const toggleMember = (id: string) => {
    setSplitWithIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const createTransaction = async () => {
    // make the purchase object
    await fetch("api/createNewTransaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payerId: payerId,
        title: transactionTitle,
        amount: transactionAmount,
        splits: [...splitWithIds].map((id) => ({
          groupMemberId: id,
          amount: transactionAmount / splitWithIds.size,
        })),
      }),
    });

    fetchTransactions();
  };

  //TODO: make a loading component
  if (error) return <p className="text-center mt-10">Error: {error}</p>;
  if (!group) return <p className="text-center mt-10">Loading group...</p>;

  return (
    <div className="min-h-screen flex flex-row items-center justify-center gap-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-xl font-bold mb-2">{group.name}</h1>
        <h2 className="text-l mb-2">{group.description}</h2>
        <h2> group members</h2>
        {groupMembers.map((groupMember) => (
          <div key={groupMember.id} className="flex flex-col text-left">
            <p>{groupMember.nickname ?? "No name"}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-xl font-semibold">New Purchase</h1>

        <input
          placeholder="Enter name of purchase"
          type="text"
          value={transactionTitle}
          onChange={(e) => setTransactionTitle(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Enter amount of purchase"
          type="number"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-col gap-2">
          <h2 className="font-medium">Who Paid?</h2>
          <select
            value={payerId}
            onChange={(e) => setPayerId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select payer</option>
            {groupMembers.map((groupMember) => (
              <option key={groupMember.id} value={groupMember.id}>
                {groupMember.nickname}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium">Select People to Split With</h2>
          {groupMembers.map((groupMember) => (
            <label key={groupMember.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={splitWithIds.has(groupMember.id)}
                onChange={() => toggleMember(groupMember.id)}
              />
              <span>{groupMember.nickname}</span>
            </label>
          ))}
        </div>

        <button
          onClick={createTransaction}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Make Transaction
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet.</p>
          ) : (
            <ul className="space-y-4">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="border border-gray-300 p-4 rounded-md shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-md font-bold">{transaction.title}</h3>
                    <span className="text-green-600 font-semibold">
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Paid by: {transaction.paidBy}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    //! Ensure that this fallback is the same as the fallback for !user
    <Suspense fallback={<p>Loading group...</p>}>
      <PageContent />
    </Suspense>
  );
}
