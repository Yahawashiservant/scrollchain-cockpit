"use client";

import QuantumStage from "../../components/quantum/QuantumStage";
import QuantumTorus from "../../components/QuantumTorus";
import KernelStatePanel from "../../components/panels/KernelStatePanel";
import NATSHealthPanel from "../../components/panels/NATSHealthPanel";
import TelemetryPanel from "../../components/panels/TelemetryPanel";

export default function DashboardPage() {
  return (
    <div className="relative w-full h-full bg-black text-cyan-500 overflow-hidden">
      
      {/* LAYER 1: 3D Stage */}
      <div className="absolute inset-0 z-0">
        <QuantumStage>
           <QuantumTorus />
        </QuantumStage>
      </div>

      {/* LAYER 2: Data Interface (Active Panels) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-8 h-full">
        
        {/* Left Panel - KERNEL STATE */}
        <div className="bg-black/80 border border-cyan-900/50 p-4 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">KERNEL STATE</h2>
            <KernelStatePanel />
        </div>

        {/* Center Panel - TELEMETRY (Spacer for the Donut in the overview) */}
        <div className="flex flex-col justify-end">
            <div className="bg-black/80 border border-purple-900/50 p-4 rounded-lg backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 text-purple-400">TELEMETRY</h2>
                <TelemetryPanel />
            </div>
        </div>

        {/* Right Panel - NATS MESH */}
        <div className="bg-black/80 border border-green-900/50 p-4 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-green-400">NATS MESH</h2>
            <NATSHealthPanel />
        </div>

      </div>
    </div>
  );
}
