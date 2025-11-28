"use client";
export default function Page() {
  return <div className="bg-black p-6 text-white h-full"><h1 className="text-2xl font-bold text-blue-300">GLOBAL WEATHER</h1><div className="mt-4 grid grid-cols-3 gap-2">{['US-East: Clear', 'EU-West: Rain', 'Asia-Pac: Storm'].map((w,i)=><div key={i} className="bg-gray-900 p-2 rounded text-sm">{w}</div>)}</div></div>;
}
