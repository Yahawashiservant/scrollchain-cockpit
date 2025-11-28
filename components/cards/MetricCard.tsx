export default function MetricCard({ label, value }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 shadow-md text-center">
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  )
}
