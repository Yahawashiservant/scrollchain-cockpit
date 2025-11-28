"use client";
export default function AssetsPage() {
  return (
    <div className="h-full w-full bg-black p-6 text-white">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">AAA ASSET TRACKER</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Platinum Bond A", "Real Estate Block 4", "Industrial Metal Index"].map((asset, i) => (
          <div key={i} className="bg-gray-900 p-4 rounded border border-yellow-900/30">
            <div className="font-bold text-yellow-100">{asset}</div>
            <div className="text-xs text-gray-500 mt-1">CLASS: RWA-TIER-1</div>
            <div className="text-lg font-mono text-green-400 mt-2">+$12.4M</div>
          </div>
        ))}
      </div>
    </div>
  );
}
