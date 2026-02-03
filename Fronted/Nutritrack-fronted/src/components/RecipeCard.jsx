import Button from "./Button";

export default function RecipeCard() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Recipe Name</h3>
      <p className="text-sm text-gray-500 mb-2">Calories: --</p>

      <div className="flex justify-between mt-3">
        <Button variant="secondary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
}
