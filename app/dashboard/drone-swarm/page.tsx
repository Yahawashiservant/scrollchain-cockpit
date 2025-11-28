"use client";
export default function Page() {
  return <div className="bg-black p-6 text-white h-full"><h1 className="text-2xl font-bold text-orange-400">DRONE SWARM</h1><div className="mt-4 relative h-64 bg-gray-900 rounded overflow-hidden">{[...Array(8)].map((_,i)=><div key={i} className="absolute w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{top:`${Math.random()*100}%`,left:`${Math.random()*100}%`}}></div>)}</div></div>;
}
