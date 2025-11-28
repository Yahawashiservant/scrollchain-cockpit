"use client";
import { useState } from "react";

export default function ConsolePage() {
  const [input, setInput] = useState("");
  return (
    <div className="h-full w-full bg-gray-900 p-6 flex flex-col text-white font-mono">
      <h1 className="text-2xl font-bold mb-4">OPERATOR CONSOLE [ROOT]</h1>
      <div className="flex-1 bg-black border border-gray-700 rounded p-4 overflow-y-auto mb-4 text-green-500">
        <div>ScrollChainOS v7.0.0-alpha</div>
        <div>System ready. Waiting for input...</div>
        <div className="mt-2 text-white">_</div>
      </div>
      <div className="flex gap-2">
        <span className="text-green-500 py-2">{">"}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-green-500"
          placeholder="Enter command..."
        />
      </div>
    </div>
  );
}
