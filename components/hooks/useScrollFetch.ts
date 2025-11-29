"use client";
import { useState, useEffect } from 'react';

// SIMULATES CONNECTION TO YOUR SUPABASE EDGE FUNCTIONS
export const useScrollFetch = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("CONNECTING");

  useEffect(() => {
    setLoading(true);
    const delay = Math.floor(Math.random() * 800) + 200; // Network latency sim

    const timer = setTimeout(() => {
      let mockData;
      const id = Math.floor(Math.random() * 9999);

      // 1. FINANCE DATA STRUCTURE
      if (endpoint.includes("ledger") || endpoint.includes("finance") || endpoint.includes("billing")) {
         mockData = Array.from({ length: 50 }).map((_, i) => ({
            id: `TX-${99999-i}`,
            hash: `0x${Math.random().toString(16).substring(2, 12)}...`,
            val: (Math.random() * 5000).toFixed(2),
            status: Math.random() > 0.02 ? "CONFIRMED" : "PENDING",
            latency: Math.floor(Math.random() * 40) + "ms"
         }));
      } 
      // 2. SECURITY/INFRA LOG STRUCTURE
      else if (endpoint.includes("log") || endpoint.includes("audit") || endpoint.includes("mesh")) {
         mockData = Array.from({ length: 50 }).map((_, i) => ({
             timestamp: new Date().toISOString(),
             level: Math.random() > 0.9 ? "WARN" : "INFO",
             msg: `${endpoint.toUpperCase()}: processed_batch_${i + id} -> OK`
         }));
      } 
      // 3. METRIC STRUCTURE (Default)
      else {
         mockData = {
            cpu: Math.floor(Math.random() * 60 + 10),
            memory: Math.floor(Math.random() * 8000 + 2000),
            requests: Math.floor(Math.random() * 50000),
            uptime: "99.999%"
         };
      }

      setData(mockData);
      setStatus("ACTIVE");
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [endpoint]);

  return { data, loading, status };
};
