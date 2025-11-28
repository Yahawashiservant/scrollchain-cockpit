"use client";
export default function Page() {
  return <div className="bg-black p-6 text-white h-full"><h1 className="text-2xl font-bold text-blue-400">SATELLITE MESH</h1><div className="mt-4 grid grid-cols-4 gap-2">{[...Array(16)].map((_,i)=><div key={i} className="bg-gray-900 p-2 text-xs text-center border border-gray-800">SAT-{i+100}<br/><span className="text-green-500">ONLINE</span></div>)}</div></div>;
}
