import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData,
        { withCredentials: true }, // important if cookies are used
      );
      navigate("/Dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
          )}
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <input
            className="w-full mb-4 p-2 border rounded"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <button className="w-full bg-green-600 text-white py-2 rounded">
            Login
          </button>

          <p className="mt-4 text-center text-sm">
            New user?{" "}
            <Link to="/signup" className="text-green-600">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
