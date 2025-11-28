"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full">
      <h1 className="text-2xl font-bold text-green-400 mb-6">GLOBAL HEALTH SUMMARY</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded"><div className="text-xs text-gray-500">NETWORK UPTIME</div><div className="text-3xl font-bold text-green-500">99.99%</div></div>
        <div className="bg-gray-900 p-4 rounded"><div className="text-xs text-gray-500">CPU LOAD AVG</div><div className="text-3xl font-bold text-yellow-500">34%</div></div>
        <div className="bg-gray-900 p-4 rounded"><div className="text-xs text-gray-500">ACTIVE USERS</div><div className="text-3xl font-bold">12,402</div></div>
      </div>
    </div>
  );
}
