"use client";
export default function Page() {
  return <div className="bg-black p-6 text-white h-full"><h1 className="text-2xl font-bold text-purple-400">INTER-CHAIN BRIDGE</h1><div className="mt-4 space-y-2">{['Ethereum <> Scroll', 'Cosmos <> Scroll', 'Solana <> Scroll'].map((b,i)=><div key={i} className="bg-gray-900 p-2 rounded flex justify-between"><span>{b}</span><span className="text-green-400">ACTIVE</span></div>)}</div></div>;
}
