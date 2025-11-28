"use client";
export default function Page() {
  return <div className="bg-black p-6 text-red-500 h-full font-mono text-xs"><h1 className="text-xl font-bold mb-4">KERNEL PANIC</h1><div className="space-y-1"><div>[ 0.000000] Kernel panic - not syncing: Fatal exception</div><div>[ 0.000000] CPU: 0 PID: 1 Comm: init Not tainted</div><div>[ 0.000000] Call Trace:</div><div>[ 0.000000] dump_stack+0x42/0x69</div></div></div>;
}
