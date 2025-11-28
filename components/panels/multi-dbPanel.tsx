"use client"
import { useEffect, useState } from "react";

export default function Panel() {
  const [msg, setMsg] = useState<any>(null);

  useEffect(() => {
    const name = "multi-db";
    const sse = new EventSource("/api/panels/" + name);

    sse.onmessage = (e) => {
      setMsg(JSON.parse(e.data));
    };

    return () => sse.close();
  }, []);

  return (
    <div className="border p-4 rounded">
      <h2>Panel: multi-db</h2>
      <pre>{JSON.stringify(msg, null, 2)}</pre>
    </div>
  );
}
