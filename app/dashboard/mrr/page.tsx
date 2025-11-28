"use client";
export default function Page() {
  return (
    <div className="bg-black p-6 text-white h-full">
      <h1 className="text-2xl font-bold text-green-500 mb-6">MRR BREAKDOWN</h1>
      <table className="w-full text-left text-sm">
        <thead className="text-gray-500"><tr><th>Plan</th><th>Subscribers</th><th>Revenue</th></tr></thead>
        <tbody className="divide-y divide-gray-800">
          <tr><td className="py-2">Starter</td><td>1,204</td><td>$12,040</td></tr>
          <tr><td className="py-2">Pro</td><td>842</td><td>$25,260</td></tr>
          <tr><td className="py-2">Enterprise</td><td>112</td><td>$224,000</td></tr>
        </tbody>
      </table>
    </div>
  );
}
