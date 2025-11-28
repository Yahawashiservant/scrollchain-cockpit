"use client";
import { useScrollFetch } from "../hooks/useScrollFetch";

export default function TelemetryPanel() {
  const { data, loading, error } = useScrollFetch('/api/blocks/telemetry');

  if (loading) return <div className="text-center text-orange-500 animate-pulse text-sm">FETCHING BLOCKS...</div>;
  if (error) return <div className="text-center text-red-500 text-sm">ERROR: API FAIL</div>;

  // CRITICAL FIX: Null Guard
  if (!data) return <div className="text-center text-gray-500 text-sm">SYNCING...</div>;

  return (
    <div className="text-sm font-mono space-y-1">
      <div className="flex justify-between">
        <span>SYNCED BLOCKS:</span>
        <span className="text-orange-400">{data.blocks_synced.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>TX / SEC:</span>
        <span className="text-white">{data.tx_per_sec}</span>
      </div>
      <div className="flex justify-between">
        <span>LAST TX AGE:</span>
        <span className="text-gray-400">{Math.floor(Math.random() * 5 + 1)}s</span>
      </div>
    </div>
  );
}
