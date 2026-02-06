import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Meals() {
  const [formData, setformData] = useState({
    MealName: "",
    servings: 0,
    eatenAt: "",
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
        "http://localhost:8000/api/v1/users/addMeal",
        formData,
        { withCredentials: true }, // important if cookies are used
      );
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Log Meal</h2>
      <div className="bg-white p-4 rounded shadow mb-6 w-auto">
        <form onSubmit={handleSubmit}>
          <input
            className="w-auto mb-3 p-2 border rounded"
            placeholder="Meal Name"
            name="MealName"
            onChange={handleChange}
          />
          <br />
          <input
            className="w-auto mb-3 p-2 border rounded"
            placeholder="Servings"
            name="servings"
            onChange={handleChange}
          />
          <br />
          <input
            className="w-auto mb-3 p-2 border rounded"
            type="date"
            onChange={handleChange}
            name="eatenAt"
          />
          <br />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Save Meal
          </button>
        </form>
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
