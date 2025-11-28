"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-red-500 mb-6">SECURITY RATING</h1>
      <div className="text-9xl font-black text-green-400">A+</div>
      <div className="text-xs text-gray-500 mt-2">NO CRITICAL VULNERABILITIES FOUND</div>
    </div>
  );
}
