"use client";
export default function ScrollKernelPage() {
  return (
    <div className="h-full w-full bg-black p-6 font-mono text-xs text-green-500 overflow-y-auto">
      <h1 className="text-xl font-bold text-white mb-4">KERNEL MEMORY MAP</h1>
      <div className="grid grid-cols-8 gap-1 opacity-70">
        {[...Array(64)].map((_, i) => (
          <div key={i} className="bg-green-900/20 p-2 border border-green-900/50 text-center hover:bg-green-500 hover:text-black cursor-crosshair">
            0x{i.toString(16).padStart(2, '0').toUpperCase()}
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-green-900 pt-4">
        <div className="mb-2">KERNEL THREADS:</div>
        <div className="text-white">PID 001 [system] ............ ACTIVE</div>
        <div className="text-white">PID 002 [quantum_bridge] .... SLEEP</div>
        <div className="text-white">PID 003 [gpu_scheduler] ..... ACTIVE</div>
      </div>
    </div>
  );
}
