"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import { supabaseClient } from "../supabaseClient";
import { UserGroup, User } from "./types";

function DashboardContent() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [joinGroupId, setJoinGroupId] = useState<string>("");

  // ----- fetching user data -----
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: authUser },
        error,
      } = await supabaseClient.auth.getUser();

      if (error) {
        // TODO: we should probably redirect the user to login here then
        setError(error.message);
        return;
      }

      const res = await fetch(`/api/user/${authUser?.id}`);
      const data = await res.json();

      if (data.user) {
        setUser(data.user);
      } else {
        // TODO: add error handling for if not able to fetch user
      }
    };

    fetchUser();
  }, []);

  const fetchUserGroups = useCallback(async () => {
    if (!user) {
      return;
    }

    const res = await fetch(`api/userGroups/${user.id}`);
    const data = await res.json();
    setUserGroups(data.userGroups);
  }, [user]);

  useEffect(() => {
    fetchUserGroups();
  }, [fetchUserGroups]);

  // ----- button logic -----
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  const handleMoveToGroupPage = async (groupMemberId: string) => {
    router.push(`/group?groupMemberId=${groupMemberId}`);
  };

  const handleCreateNewGroup = async () => {
    // create a new group
    await fetch("api/createNewGroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
      }),
    });

    // reload the user groups to update in time
    fetchUserGroups();
  };

  const handleJoinGroup = async () => {
    await fetch("api/joinExistingGroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
        groupId: joinGroupId,
      }),
    });

    fetchUserGroups();
    setJoinGroupId("");
  };

  //TODO: make a loading component
  if (!user) return <p className="text-center mt-10">Loading user...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Welcome, {user.email}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">Your Groups</h3>
          <button
            onClick={handleCreateNewGroup}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create New Group
          </button>
        </div>

        <div className="flex items-center justify-between mb-3 gap-4">
          <input
            placeholder="Enter groupID"
            value={joinGroupId}
            onChange={(e) => setJoinGroupId(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleJoinGroup}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Join
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {userGroups.length > 0 ? (
            userGroups.map((group) => (
              <button
                key={group.groupMemberId}
                onClick={() => handleMoveToGroupPage(group.groupMemberId)}
                className="flex flex-col text-left px-5 py-3 border border-gray-300 rounded-md hover:bg-green-100 cursor-pointer transition-colors duration-200"
              >
                <p>{group.groupName ?? "No group name yet"}</p>
                <p>{group.groupId}</p>
              </button>
            ))
          ) : (
            <p className="text-gray-500 italic">No groups yet</p>
          )}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 mt-6"
      >
        Logout
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
