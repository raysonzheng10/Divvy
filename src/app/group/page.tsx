// src/app/page.tsx
"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PageContent() {
  //   const router = useRouter();
  // fetch userId from URL
  const searchParams = useSearchParams();
  const groupMemberId = searchParams.get("groupMemberId");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Welcome, {groupMemberId}</h2>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    //! Ensure that this fallback is the same as the fallback for !user
    <Suspense fallback={<p>Loading user...</p>}>
      <PageContent />
    </Suspense>
  );
}
