"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full">
      <h1 className="text-2xl font-bold text-pink-500 mb-6">GEN-ART STUDIO</h1>
      <div className="border-2 border-dashed border-pink-900 rounded-xl h-64 flex flex-col items-center justify-center bg-pink-900/10">
        <span className="text-4xl">🎨</span>
        <span className="mt-2 text-pink-300">Drop Layers or Prompt Here</span>
      </div>
      <button className="w-full bg-pink-600 mt-4 py-3 rounded font-bold hover:bg-pink-500">GENERATE 10,000 COLLECTION</button>
    </div>
  );
}
