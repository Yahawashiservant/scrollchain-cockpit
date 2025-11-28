export default function PanelCard({ title, children }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  )
}
