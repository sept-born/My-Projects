export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">NutriTrack</h1>

      <div className="space-x-6">
        <a href="/dashboard">Dashboard</a>
        <a href="/recipes">Recipes</a>
        <a href="/meals">Meals</a>
      </div>

      <div className="space-x-4">
        <a href="/profile">Profile</a>
        <button className="bg-white text-green-600 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
