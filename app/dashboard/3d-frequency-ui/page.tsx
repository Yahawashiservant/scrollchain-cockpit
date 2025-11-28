"use client";

import QuantumStage from "../../../components/quantum/QuantumStage";
import QuantumVortexEngine from "../../../components/quantum/QuantumVortexEngine";
import EntropyGrid from "../../../components/quantum/EntropyGrid";
import EntangledPhotonField from "../../../components/quantum/EntangledPhotonField";

export default function FrequencyPage() {
  return (
    <div className="h-full w-full bg-black relative p-6">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h1 className="text-xl font-bold text-purple-400">3D FREQUENCY INTERFACE</h1>
        <div className="text-xs text-purple-600 font-mono">RESONANCE: 440Hz (Active)</div>
      </div>
      
      <div className="h-[600px] w-full border border-purple-900/50 rounded-xl overflow-hidden relative">
        <QuantumStage>
          <QuantumVortexEngine />
          <EntropyGrid />
          <EntangledPhotonField />
        </QuantumStage>
      </div>
      <div className="mt-4 text-center text-xs text-gray-500">Visualization operational. Use mouse to rotate view.</div>
    </div>
  );
}
