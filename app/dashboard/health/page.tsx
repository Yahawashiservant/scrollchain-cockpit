"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full">
      <h1 className="text-2xl font-bold text-green-500 mb-6">SYSTEM HEALTH</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['API Gateway', 'Database Shards', 'Auth Service', 'Quantum Core', 'Storage', 'Edge Mesh'].map((s,i) => (
          <div key={i} className="bg-gray-900 border border-green-900/30 p-4 rounded flex justify-between items-center">
            <span>{s}</span>
            <span className="text-green-400 font-mono text-xs">● 99.9% UPTIME</span>
          </div>
        ))}
      </div>
    </div>
  );
}
