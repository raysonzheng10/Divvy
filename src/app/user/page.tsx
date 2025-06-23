"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { User, UserGroup } from "./types";

function DashboardContent() {
  const router = useRouter();
  // fetch userId from URL
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [user, setUser] = useState<User | null>(null);
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);

  // ----- fetching user data -----
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        return;
      }
      const res = await fetch(`/api/user/${userId}`);
      const data = await res.json();

      if (data.user) {
        setUser(data.user);
      } else {
        // TODO: add error handling for if not able to fetch user
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    fetchUserGroups();
  }, [userId]);

  const fetchUserGroups = async () => {
    const res = await fetch(`api/userGroups/${userId}`);
    const data = await res.json();
    setUserGroups(data.userGroups);
  };

  // ----- button logic -----
  const handleLogout = async () => {
    router.push("/");
  };

  const handleGroupPage = async (groupMemberId: string) => {
    router.push(`/group?groupMemberId=${groupMemberId}`);
  };

  const handleCreateNewGroup = async () => {
    // create a new group
    const res = await fetch("api/group/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    // reload the user groups to update in time
    fetchUserGroups();
  };

  //TODO: make a loading component
  if (!user) return <p className="text-center mt-10">Loading user...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Welcome, {user.name}</h2>
        <h3 className="text-xl font-bold mb-2"> Your Groups </h3>
        <div className="flex flex-col gap-4">
          {userGroups.length > 0 ? (
            userGroups.map((group) => (
              <button
                key={group.groupMemberId}
                onClick={() => handleGroupPage(group.groupMemberId)}
                className="px-4 py-2 border rounded hover:bg-green-50 cursor-pointer transition"
              >
                {group.groupName ?? "no group name yet"} {group.groupMemberId}
              </button>
            ))
          ) : (
            <p>No groups yet</p>
          )}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Logout
      </button>
      <button
        onClick={handleCreateNewGroup}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Create new group
      </button>
    </div>
  );
}

export default function Dashboard() {
  return (
    //! Ensure that this fallback is the same as the fallback for !user
    <Suspense fallback={<p>Loading user...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
