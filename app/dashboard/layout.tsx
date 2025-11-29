import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    /* h-screen locks the outer frame, flex-row puts sidebar next to content */
    <div className="flex h-screen w-full bg-[#02040a] text-white overflow-hidden">
      
      {/* SIDEBAR: Fixed width, does not shrink */}
      <aside className="w-64 flex-shrink-0 h-full border-r border-cyan-900/30 bg-black/90 z-50 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT: Takes remaining width */}
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        
        {/* Header Line */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-500 shrink-0"></div>
        
        {/* SCROLL AREA: This div handles the vertical scrolling */ }
        <div className="flex-1 overflow-y-auto p-0 z-10 relative scrollbar-thin">
           {children}
        </div>

        {/* BACKGROUND: Pushed to back, clicks pass through */ }
        <div className="absolute inset-0 z-0 pointer-events-none">
           {/* This ensures the 3D scene doesn't block your mouse */}
        </div>
      </main>
    </div>
  )
}
