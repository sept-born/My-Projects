import Layout from "../components/Layout";

export default function UserProfile() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-2">@username</h2>
      <p className="text-gray-500 mb-6">Public Profile</p>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            Recipe Name
          </div>
        ))}
      </div>
    </Layout>
  );
}
