"use client";

// FIXED PATHS: Uses ../../../ to reach root components
import NeuralShaderEnginePanel from "../../../components/NeuralShaderEngine/NeuralShaderEnginePanel";

export default function NeuralPage() {
  return (
    <div className="h-full w-full bg-black p-6">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">NEURAL SHADER ENGINE</h1>
      <div className="h-[600px] w-full">
        <NeuralShaderEnginePanel />
      </div>
    </div>
  );
}
