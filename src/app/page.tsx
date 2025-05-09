// src/app/page.tsx
"use client";

import { useState } from "react";

export default function Page() {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);

  const fetchUser = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log("Fetched user:", data);
    setUser(data);
  };

  return (
    <div className="p-6">
      <button
        onClick={fetchUser}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Fetch “rayson”
      </button>

      {user && <div>{JSON.stringify(user, null, 2)}</div>}
    </div>
  );
}
