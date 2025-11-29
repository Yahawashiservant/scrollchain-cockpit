import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#02040a] text-white overflow-hidden">
      <aside className="w-64 flex-shrink-0 h-full border-r border-cyan-900/30 bg-black/90 z-50">
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50 shrink-0 z-20"></div>
        <div className="flex-1 overflow-y-auto scroll-area p-0 relative z-10">
           {children}
           <div className="h-24"></div>
        </div>
      </main>
    </div>
  )
}
