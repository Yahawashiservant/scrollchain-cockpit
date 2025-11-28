"use client";
import { useScrollFetch } from "../../../components/hooks/useScrollFetch";

export default function TelemetryPage() {
  const { data, loading, error } = useScrollFetch('/api/blocks/telemetry');

  return (
    <div className="h-full w-full bg-black p-6 text-white">
      <h1 className="text-2xl font-bold text-orange-400 mb-6">TELEMETRY STATE</h1>
      <div className="bg-gray-900/80 border border-orange-900/50 rounded-lg p-6">
        
        {loading && <div className="text-center text-orange-500 animate-pulse">Fetching Block Metrics...</div>}
        {error && <div className="text-center text-red-500">ERROR: {error}</div>}

        {data && (
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-sm font-bold text-gray-400">BLOCKS SYNCED</h3>
              <div className="text-5xl font-mono text-orange-300 mt-2">{data.blocks_synced.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold text-gray-400">TX / SEC</h3>
              <div className="text-5xl font-mono text-white mt-2">{data.tx_per_sec}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
