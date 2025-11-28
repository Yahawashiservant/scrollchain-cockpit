import React from 'react';
import dynamic from 'next/dynamic';
import QuantumLayout from './QuantumLayout';

const Canvas = dynamic(() => import('@react-three/fiber').then(m => m.Canvas), { ssr: false });

function TorusNode({ color = '#00f5ff', radius = 1, tube = 0.32 }) {
  return <mesh rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[radius, tube, 64, 128]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.4} roughness={0.35} />
  </mesh>;
}

export default function QuantumTemplate({ title, children }: { title: string; children?: React.ReactNode; }) {
  return (
    <QuantumLayout>
      <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div className="panel-title">{title}</div>
          <div style={{ height: 440, borderRadius: 16, overflow: 'hidden' }}>
            <Canvas camera={{ position: [2.5, 2.2, 2.5] }}>
              <ambientLight intensity={0.55} />
              <pointLight position={[3, 3, 3]} intensity={1.1} color="#b300ff" />
              <TorusNode color="#00f5ff" radius={1.0} tube={0.32} />
              <TorusNode color="#b300ff" radius={1.8} tube={0.18} />
              <TorusNode color="#8af3ff" radius={2.6} tube={0.12} />
            </Canvas>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">Context</div>
          <div style={{ minHeight: 200 }}>{children ?? <div style={{ opacity: 0.75 }}>No context provided.</div>}</div>
        </div>
      </div>
    </QuantumLayout>
  );
}
