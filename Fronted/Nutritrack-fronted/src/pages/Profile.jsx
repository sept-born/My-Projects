import Layout from "../components/Layout";

export default function Profile() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="bg-white p-6 rounded shadow w-96">
        <p>
          <strong>Name:</strong> User Name
        </p>
        <p>
          <strong>Email:</strong> user@email.com
        </p>
        <p>
          <strong>Username:</strong> username
        </p>

        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Edit Profile
        </button>
      </div>
    </Layout>
  );
}
