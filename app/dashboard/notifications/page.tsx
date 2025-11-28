"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">NOTIFICATION CENTER</h1>
      <div className="space-y-3">
        <div className="bg-red-900/20 border border-red-500/50 p-3 rounded flex justify-between">
           <span>High Network Latency Detected</span>
           <span className="text-xs text-gray-400">2m ago</span>
        </div>
        <div className="bg-green-900/20 border border-green-500/50 p-3 rounded flex justify-between">
           <span>Backup Complete</span>
           <span className="text-xs text-gray-400">1h ago</span>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/50 p-3 rounded flex justify-between">
           <span>New Validator Joined</span>
           <span className="text-xs text-gray-400">3h ago</span>
        </div>
      </div>
    </div>
  );
}
