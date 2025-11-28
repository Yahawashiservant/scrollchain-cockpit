"use client";
export default function Page() {
  return <div className="bg-black p-6 text-white h-full"><h1 className="text-2xl font-bold text-gray-200">INTEL FEED</h1><div className="mt-4 space-y-2">{['Market hits ATH', 'New Regulation Proposed', 'Quantum Breakthrough'].map((n,i)=><div key={i} className="border-b border-gray-800 pb-2">{n}</div>)}</div></div>;
}
