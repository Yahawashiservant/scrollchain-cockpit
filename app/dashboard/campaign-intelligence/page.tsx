"use client";

export default function CampaignPage() {
  const campaigns = [
    { name: "Orbital Launch", status: "LIVE", reach: "12.4M", conv: "2.1%" },
    { name: "Deep Mesh Expansion", status: "PENDING", reach: "--", conv: "--" },
    { name: "Quantum Airdrop", status: "FINISHED", reach: "45.1M", conv: "8.4%" },
    { name: "Node Activation", status: "LIVE", reach: "8.2M", conv: "5.5%" },
  ];

  return (
    <div className="h-full w-full bg-black p-6 text-white overflow-y-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">CAMPAIGN INTELLIGENCE</h1>
          <div className="text-xs text-gray-500 font-mono">ACTIVE_CHANNELS: 14</div>
        </div>
        <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded text-xs font-bold text-black">
          + NEW CAMPAIGN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
           <div className="text-gray-400 text-xs">TOTAL REACH</div>
           <div className="text-3xl font-bold text-white">65.7M</div>
           <div className="text-green-500 text-xs">↑ 12% this week</div>
         </div>
         <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
           <div className="text-gray-400 text-xs">CONVERSION RATE</div>
           <div className="text-3xl font-bold text-white">4.2%</div>
           <div className="text-red-500 text-xs">↓ 0.4% this week</div>
         </div>
         <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
           <div className="text-gray-400 text-xs">ACTIVE SPEND</div>
           <div className="text-3xl font-bold text-white">14.2 ETH</div>
         </div>
         <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
           <div className="text-gray-400 text-xs">ROI (ROAS)</div>
           <div className="text-3xl font-bold text-orange-400">3.8x</div>
         </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-900 border-b border-gray-800 text-sm font-bold text-gray-300">
          GLOBAL OPERATIONS LOG
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-900/80 text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-4">Campaign Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Reach</th>
              <th className="p-4">Conversion</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {campaigns.map((c, i) => (
              <tr key={i} className="hover:bg-gray-800/50 transition">
                <td className="p-4 font-medium text-white">{c.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    c.status === "LIVE" ? "bg-green-900 text-green-400" :
                    c.status === "PENDING" ? "bg-yellow-900 text-yellow-400" :
                    "bg-gray-800 text-gray-400"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{c.reach}</td>
                <td className="p-4 text-gray-300">{c.conv}</td>
                <td className="p-4 text-gray-400 hover:text-white cursor-pointer">Edit &rarr;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
