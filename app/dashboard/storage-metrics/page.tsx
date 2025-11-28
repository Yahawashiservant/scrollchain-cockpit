"use client";
export default function Page() {
  return <div className="bg-black p-6 text-white h-full"><h1 className="text-2xl font-bold text-blue-400">STORAGE METRICS</h1><div className="mt-4 grid grid-cols-2 gap-4"><div className="bg-gray-900 p-4 rounded"><span>Read IOPS</span><span className="float-right text-blue-400">12k</span></div><div className="bg-gray-900 p-4 rounded"><span>Write IOPS</span><span className="float-right text-blue-400">8k</span></div></div></div>;
}
