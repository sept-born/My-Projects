import Layout from "../components/Layout";

export default function Recipes() {
  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">My Recipes</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          + Add Recipe
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Recipe Name</h3>
            <p className="text-sm text-gray-500">Calories: --</p>
            <div className="flex justify-between mt-3">
              <button className="text-green-600">Edit</button>
              <button className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
