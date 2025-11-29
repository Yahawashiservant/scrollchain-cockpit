import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full bg-[#02040a] text-white overflow-hidden">
      {/* Fixed Sidebar */}
      <aside className="w-64 flex-shrink-0 h-full border-r border-cyan-900/30 bg-black/90 z-50 relative">
        <Sidebar />
      </aside>

      {/* Scrollable Content Area */}
      <main className="flex-1 h-full relative flex flex-col min-w-0">
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-50 shrink-0 z-20"></div>
        
        {/* THIS DIV SCROLLS */}
        <div className="flex-1 overflow-y-auto p-0 relative z-10">
           {children}
        </div>

        {/* Fixed Background */}
        <div className="absolute inset-0 pointer-events-none z-0"></div>
      </main>
    </div>
  )
}
