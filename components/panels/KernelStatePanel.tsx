"use client";
import { useScrollFetch } from "../hooks/useScrollFetch";

export default function KernelStatePanel() {
  const { data, loading, error } = useScrollFetch('/api/kernel/state');

  if (loading) return <div className="text-center text-cyan-500 animate-pulse text-sm">LOADING STATE...</div>;
  if (error) return <div className="text-center text-red-500 text-sm">ERROR: API FAIL</div>;
  
  // CRITICAL FIX: Null Guard
  if (!data) return <div className="text-center text-gray-500 text-sm">INITIALIZING...</div>;

  return (
    <div className="text-sm font-mono space-y-1">
      <div className="flex justify-between">
        <span>STATUS:</span>
        <span className="text-green-400">{data.status}</span>
      </div>
      <div className="flex justify-between">
        <span>CPU LOAD:</span>
        <span className="text-yellow-400">{data.cpu_load}%</span>
      </div>
      <div className="flex justify-between">
        <span>THREADS:</span>
        <span className="text-cyan-400">{data.threads}</span>
      </div>
    </div>
  );
}
