"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { User } from "./types";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      const res = await fetch(`/api/user/${userId}`);
      const data = await res.json();
      setUser(data.user);
    };

    fetchUser();
  }, [userId]);

  const handleLogout = async () => {
    router.push("/");
  };

  if (!user) return <p className="text-center mt-10">Loading user...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Welcome, {user.name}</h2>
        <p className="text-gray-600">User ID: {user.id}</p>
        <p className="text-gray-600">Email: {user.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default function Dashboard() {
  return (
    // !ensure that this fallback is the same as the fallback for !user (line 27)
    <Suspense fallback={<p>Loading user...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
