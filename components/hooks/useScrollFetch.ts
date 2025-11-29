"use client";
import { useState, useEffect } from 'react';

const API_BASE = "https://yvxyxpqdzjwplztvmkxg.supabase.co/functions/v1";

export const useScrollFetch = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("CONNECTING");

  useEffect(() => {
    if (!endpoint) return;
    setLoading(true);
    
    const fetchData = async () => {
      try {
        // Real fetch attempt
        // Note: Without Auth headers, this will likely return 401, which confirms the endpoint EXISTS.
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ping: true })
        });
        
        if (res.ok || res.status === 401) {
            setStatus("ACTIVE");
            setData({ status: "ONLINE", timestamp: new Date().toISOString(), endpoint: endpoint });
        } else {
            setStatus("ERROR");
        }
      } catch (e) {
        setStatus("OFFLINE");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); // Heartbeat every 15s
    return () => clearInterval(interval);
  }, [endpoint]);

  return { data, loading, status };
};
