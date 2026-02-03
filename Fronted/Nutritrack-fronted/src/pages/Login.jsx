export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input className="w-full mb-4 p-2 border rounded" placeholder="Email" />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          New user?{" "}
          <a href="/signup" className="text-green-600">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
