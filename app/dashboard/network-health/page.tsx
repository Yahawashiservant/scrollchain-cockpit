"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full">
      <h1 className="text-2xl font-bold text-blue-400 mb-6">NETWORK MESH HEALTH</h1>
      <div className="space-y-4">
        <div className="flex justify-between"><span>Region US-EAST</span><span className="text-green-500">Optimal</span></div>
        <div className="flex justify-between"><span>Region EU-WEST</span><span className="text-yellow-500">High Latency</span></div>
        <div className="flex justify-between"><span>Region ASIA-PAC</span><span className="text-green-500">Optimal</span></div>
      </div>
    </div>
  );
}
