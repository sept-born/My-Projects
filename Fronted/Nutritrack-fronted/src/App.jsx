import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Meals from "./pages/Meals";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Meals" element={<Meals />} />
      <Route path="/Recipes" element={<Recipes />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/UserProfile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
