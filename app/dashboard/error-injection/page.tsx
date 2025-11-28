"use client";
export default function Page() {
  return <div className="bg-black p-6 text-white h-full"><h1 className="text-2xl font-bold text-orange-400">FAULT SIM</h1><div className="mt-4 space-y-2"><button className="bg-gray-800 p-2 rounded w-full text-sm">INJECT SEGFAULT</button><button className="bg-gray-800 p-2 rounded w-full text-sm">INJECT DEADLOCK</button></div></div>;
}
