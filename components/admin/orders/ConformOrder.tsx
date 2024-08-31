"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ConformOrder({
  status,
  id,
}: {
  status: string;
  id: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter()
  const handleStatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/order/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "DELIVERED" }),
      });
      if (response.ok) {
        toast(`Order ${id} status updated to Delivered`);
        setLoading(false);
        router.refresh()
      } else {
        toast("Failed to update order status");
        setError("action fail...");
      }
    } catch (error) {
  
    }
  };
  return (
    <button
      onClick={handleStatus}
      disabled={status === "DELIVERED"}
      className="sm:text-base disabled:bg-white disabled:text-black px-3 py-1 text-xs text-white bg-blue-500 rounded"
    >
      {status === "DELIVERED" ? "Done" : "Confirm Delivery"}
    </button>
  );
}
