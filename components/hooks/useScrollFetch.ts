"use client";
import { useState, useEffect } from 'react';

// Base URL for your Edge Functions
const API_BASE = "https://yvxyxpqdzjwplztvmkxg.supabase.co/functions/v1";

export const useScrollFetch = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("CONNECTING");

  useEffect(() => {
    setLoading(true);
    
    // Simulate Network Latency
    const delay = Math.floor(Math.random() * 500) + 200;
    
    const timer = setTimeout(() => {
      const isLedger = endpoint.includes("ledger") || endpoint.includes("finance") || endpoint.includes("receipts");
      const isLog = endpoint.includes("log") || endpoint.includes("audit");
      
      let mockData;
      
      if (isLedger) {
         // Financial Data Structure - PURE CODE, NO ESCAPES NEEDED
         mockData = Array.from({ length: 50 }).map((_, i) => ({
            id: `TX-${Math.floor(Math.random() * 999999)}`,
            hash: `0x${Math.random().toString(16).substring(2, 12)}...`,
            val: (Math.random() * 100).toFixed(4) + " ETH",
            status: Math.random() > 0.05 ? "CONFIRMED" : "PENDING",
            latency: Math.floor(Math.random() * 50) + "ms"
         }));
      } else if (isLog) {
         // System Log Structure
         mockData = Array.from({ length: 50 }).map((_, i) => ({
             msg: `[${new Date().toISOString()}] ${endpoint}: process_packet_${i} -> OK`
         }));
      } else {
         // Metrics Structure
         mockData = {
            cpu: Math.floor(Math.random() * 60 + 20),
            memory: Math.floor(Math.random() * 4000 + 1000),
            requests: Math.floor(Math.random() * 10000),
            uptime: "99.99%"
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
