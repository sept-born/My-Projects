export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Full Name"
        />
        <input className="w-full mb-3 p-2 border rounded" placeholder="Email" />
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}
