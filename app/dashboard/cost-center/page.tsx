"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full">
      <h1 className="text-2xl font-bold text-green-500 mb-6">FINANCIAL OVERVIEW</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-4 rounded"><span>Compute</span><span className="float-right text-green-400">$12k</span></div>
        <div className="bg-gray-900 p-4 rounded"><span>Storage</span><span className="float-right text-green-400">$4k</span></div>
      </div>
    </div>
  );
}
