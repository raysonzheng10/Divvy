"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Group, GroupUser } from "./types";

function PageContent() {
  const router = useRouter();

  // fetch userId from URL
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const groupMemberId = searchParams.get("groupMemberId");

  const [group, setGroup] = useState<Group | null>(null);
  const [groupUsers, setGroupUsers] = useState<GroupUser[]>([]);

  const [purchaseTitle, setPurchaseTitle] = useState<string>("");
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

  useEffect(() => {
    const fetchGroup = async () => {
      if (!groupId) {
        return;
      }

      const res = await fetch(`api/group/${groupId}`);
      const data = await res.json();

      if (data.group) {
        setGroup(data.group);
      } else {
        // TODO: add error handling
      }
    };

    fetchGroup();
  }, [groupId]);

  useEffect(() => {
    const fetchGroupUsers = async () => {
      if (!groupId) {
        return;
      }

      const res = await fetch(`api/getGroupMembersWithGroupId/${groupId}`);
      const data = await res.json();

      if (data.groupUsers) {
        setGroupUsers(data.groupUsers);
      } else {
        // TODO: add error handling
      }
    };

    fetchGroupUsers();
  }, [groupId]);

  console.log(groupUsers);

  const createPurchase = async () => {
    // make the purchase object
    await fetch("api/purchase/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupId: groupId,
        groupMemberId: groupMemberId,
        title: purchaseTitle,
        amount: purchaseAmount,
      }),
    });

    // do the even splits for all expenses objects
  };

  //TODO: make a loading component
  if (!group) return <p className="text-center mt-10">Loading group...</p>;

  return (
    <div className="min-h-screen flex flex-row items-center justify-center gap-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-xl font-bold mb-2">{group.name}</h1>
        <h2 className="text-l mb-2">{group.description}</h2>
        <h2> group members</h2>
        {groupUsers.map((groupUser) => (
          <div
            key={groupUser.groupMemberId}
            className="flex flex-col text-left"
          >
            <p>{groupUser.name ?? "No name"}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 bg-white p-6 rounded shadow max-w-md w-full">
        <h1>Title</h1>
        <input
          placeholder="Enter name of purchase"
          type="text"
          value={purchaseTitle}
          onChange={(e) => setPurchaseTitle(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Enter amount of purchase"
          type="number"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(Number(e.target.value))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={createPurchase}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Make Purchase
        </button>
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
