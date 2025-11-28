"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full">
      <h1 className="text-2xl font-bold text-purple-400 mb-6">REAL-TIME DATA</h1>
      <div className="space-y-4">
        <div className="bg-gray-900 p-3 rounded">Events/Sec: <span className="text-purple-400 font-mono">1,400</span></div>
        <div className="bg-gray-900 p-3 rounded">New Users/Min: <span className="text-purple-400 font-mono">12</span></div>
      </div>
    </div>
  );
}
