export default function PanelContainer({ title, children }) {
  return (
    <div className="border border-neutral-800 bg-neutral-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-cyan-300">{title}</h2>
      {children}
    </div>
  );
}
