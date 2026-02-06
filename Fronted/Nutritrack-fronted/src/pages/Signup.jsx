import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    fullname: "",
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
        "http://localhost:8000/api/v1/users/register",
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
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded shadow w-96">
          {/* ERROR MESSAGE */}
          {error && (
            <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
          )}

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Full Name"
            name="fullname"
            onChange={handleChange}
          />
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            name="password"
          />

          <button className="w-full bg-green-600 text-white py-2 rounded">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
