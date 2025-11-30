export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#02040a] text-white overflow-hidden">
      <main className="flex-1 overflow-y-auto scroll-area relative z-10 min-w-0">
        {children}
      </main>
    </div>
  );
}
