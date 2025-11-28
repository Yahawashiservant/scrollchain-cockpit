import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full bg-[#02040a] text-white relative">
      
      {/* Sidebar: Fixed */}
      <aside className="w-64 flex-shrink-0 h-full border-r border-cyan-900/30 bg-black/80 backdrop-blur-xl z-50">
        <Sidebar />
      </aside>

      {/* Main Content Area: Scrollable */}
      <main className="flex-1 h-full relative flex flex-col min-w-0">
        
        {/* Top Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex-shrink-0"></div>
        
        {/* SCROLL CONTAINER */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-0 relative z-10">
           {children}
           {/* Spacer for scrolling comfort */}
           <div className="h-24"></div>
        </div>
        
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.05),transparent_70%)]"></div>
      </main>
    </div>
  )
}
