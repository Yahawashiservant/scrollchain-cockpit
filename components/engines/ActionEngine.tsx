"use client";
import React from "react";

export default function ActionEngine({ response }: { response?: { success: boolean, data?: any, error?: any } }) {
  return (
    <div className={response?.success ? "text-green-400" : "text-red-400"}>
      <div>[{new Date().toLocaleTimeString()}] Execution Complete.</div>
      <div>Status: {response?.success ? "SUCCESS" : "FAILURE"}</div>
      <div className="mt-2 whitespace-pre-wrap">
        {JSON.stringify(response?.data || response?.error, null, 2)}
      </div>
    </div>
  );
}
