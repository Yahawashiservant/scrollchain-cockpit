"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch("/api/cockpit/index")
      .then(r => r.json())
      .then(d => setModules(d.modules || []));
  }, []);

  return (
    <div style={{
      width:"260px", background:"#000", color:"#4af",
      height:"100vh", padding:"20px", overflowY:"auto",
      borderRight:"1px solid #333"
    }}>
      <h2 style={{color:"#fff",marginBottom:"18px"}}>⚙️ Sovereign Cockpit</h2>
      {modules.map((mod) => (
        <div key={mod.path} style={{marginBottom:"10px"}}>
          <Link href={mod.path} style={{color:"#4af"}}>
            {mod.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
