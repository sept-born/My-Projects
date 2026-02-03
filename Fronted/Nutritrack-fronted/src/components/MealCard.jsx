export default function MealCard() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Meal Name</h3>
      <p className="text-sm text-gray-500">Calories: -- | Protein: --g</p>
      <p className="text-xs text-gray-400 mt-1">Logged at 12:30 PM</p>
    </div>
  );
}
