import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Today’s Summary</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {["Calories", "Protein", "Carbs", "Fat"].map((item) => (
          <div key={item} className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-500">{item}</p>
            <p className="text-xl font-bold">--</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-4">Nutrition Chart</h3>
        <div className="h-40 bg-gray-200 flex items-center justify-center">
          Chart goes here
        </div>
      </div>
    </Layout>
  );
}
