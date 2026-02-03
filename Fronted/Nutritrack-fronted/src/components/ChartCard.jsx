export default function ChartCard({ title }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
        Chart Placeholder
      </div>
    </div>
  );
}
