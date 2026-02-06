import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Recipes() {
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    nutrition: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
    ingredients: [],
    instructions: "",
  });
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    nutrition: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
    ingredients: [],
    instructions: "",
  });

  const [editError, setEditError] = useState("");

  const getRecipes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/recipe/getRecipe",
        { withCredentials: true },
      );

      setRecipes(res.data.data); // ApiResponse -> data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch recipes");
    } finally {
    }
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/recipe/AddRecipe",
        formData,
        { withCredentials: true },
      );
      (navigate("/Recipes"), setShowModal(false));
      await getRecipes();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/api/v1/recipe/EditRecipe/${editingRecipeId}`,
        editFormData,
        { withCredentials: true },
      );

      setShowEditModal(false);
      setEditingRecipeId(null);
      getRecipes(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update recipe");
    }
  };
  const handleDelete = async (recipeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/v1/recipe/delete/${recipeId}`,
        { withCredentials: true },
      );

      // Option 1: refetch
      getRecipes();

      // Option 2 (better): optimistic update
      // setRecipes((prev) => prev.filter(r => r._id !== recipeId));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">My Recipes</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Recipe
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{recipe.title}</h3>

            <p className="text-sm text-gray-600">
              Calories: {recipe.nutrition?.calories ?? "--"}
            </p>

            <div className="flex justify-between mt-3">
              <button
                className="text-green-600 text-sm hover:underline"
                onClick={() => {
                  setEditingRecipeId(recipe._id);
                  setSelectedRecipe(recipe);
                  setEditFormData({
                    title: recipe.title,
                    nutrition: recipe.nutrition || {
                      calories: "",
                      protein: "",
                      carbs: "",
                      fat: "",
                    },
                    ingredients: recipe.ingredients || [],
                    instructions: recipe.instructions || "",
                  });
                  setShowEditModal(true);
                }}
              >
                Edit
              </button>

              <button
                className="text-red-500 text-sm"
                onClick={() => handleDelete(recipe._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Recipe</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Recipe Title"
                name="title"
                onChange={handleChange}
              />

              {/* Nutrition */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="border p-2 rounded"
                  placeholder="Calories"
                  name="nutrition.calories"
                  type="number"
                  onChange={handleNestedChange}
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Protein (g)"
                  name="nutrition.protein"
                  type="number"
                  onChange={handleNestedChange}
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Carbs (g)"
                  name="nutrition.carbs"
                  type="number"
                  onChange={handleNestedChange}
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Fat (g)"
                  name="nutrition.fat"
                  type="number"
                  onChange={handleNestedChange}
                />
              </div>

              <textarea
                className="w-full border p-2 rounded"
                placeholder="Instructions"
                name="instructions"
                onChange={handleChange}
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Ingredients (comma separated)"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ingredients: e.target.value.split(","),
                  }))
                }
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>

            {editError && (
              <p className="text-red-500 text-sm mb-3">{editError}</p>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Recipe Title"
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />

              {/* Nutrition */}
              <div className="grid grid-cols-2 gap-2">
                {["calories", "protein", "carbs", "fat"].map((field) => (
                  <input
                    key={field}
                    type="number"
                    placeholder={field}
                    className="border p-2 rounded"
                    value={editFormData.nutrition[field]}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        nutrition: {
                          ...prev.nutrition,
                          [field]: e.target.value,
                        },
                      }))
                    }
                  />
                ))}
              </div>

              <textarea
                className="w-full border p-2 rounded"
                placeholder="Instructions"
                value={editFormData.instructions}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    instructions: e.target.value,
                  }))
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Ingredients (comma separated)"
                value={editFormData.ingredients.join(",")}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    ingredients: e.target.value.split(","),
                  }))
                }
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
