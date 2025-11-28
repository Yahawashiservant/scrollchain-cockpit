"use client";
import { useNatsStatus } from "../hooks/useNatsStatus";

export default function NATSHealthPanel() {
  const { status, latency, messagesPerSecond } = useNatsStatus();

  const color = status === 'CONNECTED' ? 'text-green-400' : 'text-yellow-400 animate-pulse';

  return (
    <div className="text-sm font-mono space-y-1">
      <div className="flex justify-between">
        <span>NETWORK:</span>
        <span className={color}>{status}</span>
      </div>
      <div className="flex justify-between">
        <span>LATENCY:</span>
        <span className="text-cyan-400">{latency !== null ? `${latency}ms` : '---'}</span>
      </div>
      <div className="flex justify-between">
        <span>MSGS/SEC:</span>
        <span className="text-purple-400">{messagesPerSecond !== null ? messagesPerSecond.toLocaleString() : '---'}</span>
      </div>
    </div>
  );
}
