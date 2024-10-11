"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface ApplyButtonProps {
  jobId: string;
}

export function ApplyButton({ jobId }: ApplyButtonProps) {
  const { data: session } = useSession();
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = async () => {
    if (!session) {
      // Redirect to login page or show login modal
      return;
    }

    setIsApplying(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (response.ok) {
        setIsApplied(true);
      } else {
        // Handle error
        console.error("Failed to apply for the job");
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
    } finally {
      setIsApplying(false);
    }
  };

  if (isApplied) {
    return (
      <p className="text-green-600 font-semibold">
        Application submitted successfully!
      </p>
    );
  }

  return (
    <button
      onClick={handleApply}
      disabled={isApplying || !session}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
    >
      {isApplying ? "Applying..." : "Apply Now"}
    </button>
  );
}
