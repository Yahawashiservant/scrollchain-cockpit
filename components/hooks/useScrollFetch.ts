"use client";
import { useState, useEffect } from 'react';
export const useScrollFetch = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    // Mock data for stability
    setData({ status: "OPERATIONAL", cpu_load: 42, threads: 12, blocks_synced: 10000, tx_per_sec: 150 });
  }, []);
  return { data, loading: false, error: null };
};
