"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Group, GroupMember } from "./types";

function PageContent() {
  // const router = useRouter();

  // fetch userId from URL
  const searchParams = useSearchParams();
  const groupMemberId = searchParams.get("groupMemberId");

  const [error, setError] = useState<string>("");
  const [group, setGroup] = useState<Group | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);

  const [purchaseTitle, setPurchaseTitle] = useState<string>("");
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

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

  // const createPurchase = async () => {
  //   // make the purchase object
  //   await fetch("api/purchase/create", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       groupId: groupId,
  //       groupMemberId: groupMemberId,
  //       title: purchaseTitle,
  //       amount: purchaseAmount,
  //     }),
  //   });

  //   // do the even splits for all expenses objects
  // };

  //TODO: make a loading component
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
      {/* <div className="flex flex-col gap-4 bg-white p-6 rounded shadow max-w-md w-full">
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
      </div> */}
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
