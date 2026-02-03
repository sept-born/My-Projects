import Layout from "../components/Layout";

export default function Meals() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Log Meal</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Meal Name"
        />
        <input className="w-full mb-3 p-2 border rounded" type="date" />
        <input className="w-full mb-3 p-2 border rounded" type="time" />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save Meal
        </button>
      </div>

      <h3 className="font-semibold mb-2">Past Meals</h3>
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-3 rounded shadow">
            Meal Name – Calories --
          </div>
        ))}
      </div>
    </Layout>
  );
}
