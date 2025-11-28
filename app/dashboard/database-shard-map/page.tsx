"use client";
export default function Page() {
  return <div className="bg-black p-6 text-white h-full"><h1 className="text-2xl font-bold text-purple-400">SHARD TOPOLOGY</h1><div className="mt-4 grid grid-cols-4 gap-2">{[...Array(16)].map((_,i)=><div key={i} className="h-10 bg-gray-900 rounded border border-purple-900/30 flex items-center justify-center text-xs">S{i}</div>)}</div></div>;
}
