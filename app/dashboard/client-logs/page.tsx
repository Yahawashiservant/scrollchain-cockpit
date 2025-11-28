"use client";
export default function ClientLogsPage() {
  return (
    <div className="h-full w-full bg-black p-4 font-mono text-xs text-gray-400 overflow-y-auto">
      <h1 className="text-xl font-bold text-white mb-4 sticky top-0 bg-black pb-2 border-b border-gray-800">CLIENT CONNECTION LOGS</h1>
      <div className="space-y-1">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="hover:bg-gray-900 p-1 rounded">
             <span className="text-gray-600">[{new Date().toISOString()}]</span> 
             <span className="text-blue-400 ml-2">client_id_x{i}99</span> 
             <span className="text-white ml-2">handshake_success</span> 
             <span className="text-green-500 ml-2">latency={10 + i}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}
