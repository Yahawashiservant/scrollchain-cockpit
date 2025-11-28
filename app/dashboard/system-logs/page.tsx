"use client";
export default function Page() {
  return <div className="bg-black p-4 text-green-500 font-mono text-xs h-full overflow-y-auto"><div className="border-b border-gray-800 pb-2 mb-2">ROOT SYSTEM LOGS</div>{[...Array(20)].map((_,i)=><div key={i}>[kernel] process_id_{i} started successfully.</div>)}</div>;
}
