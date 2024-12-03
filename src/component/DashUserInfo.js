import React, { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext.js";
import { Logout } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DashUserInfo() {
  const { user, setUser } = useContext(LoginContext); // Access user context
  const [username, setUsername] = useState(user?.username || ""); // Controlled input for username
  const [email, setEmail] = useState(user?.email || ""); // Controlled input for email
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null); // Clear user context
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Update User Details Function
  const handleUpdateDetails = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/updateDetails/${user._id}`,
        { username, email }, // Send updated details
        { withCredentials: true }
      );
      setUser((prev) => ({ ...prev, username, email })); // Update user context with new data
      alert(response.data.message || "Details updated successfully!");
    } catch (error) {
      console.error("Failed to update details:", error.message);
    }
  };

  return (
    <div className="w-full p-2 space-y-5 border-2 border-red-600 bg-gradient-to-br from-[#000000] via-[#150000] to-[#210101]">
      {/* Form for updating user details */}
      <form className="flex justify-around" onSubmit={handleUpdateDetails}>
        <div className="space-x-2">
          <label className="text-white ml-2 font-semibold text-lg">
            Student Name:
          </label>
          <input
            type="text"
            className="p-1 bg-red-950 rounded-sm text-slate-400"
            value={username} // Controlled input value
            onChange={(e) => setUsername(e.target.value)} // Update state
            placeholder={user.username}
          />
        </div>
        <div className="space-x-2">
          <label className="text-white font-semibold text-lg">Email:</label>
          <input
            type="email"
            className="p-1 bg-red-950 rounded-sm text-slate-400"
            value={email} // Controlled input value
            onChange={(e) => setEmail(e.target.value)} // Update state
            placeholder={user.email}
          />
        </div>
        <button
          type="submit"
          className="text-white font-semibold p-1 rounded-sm border-2 border-red-500 bg-red-950"
        >
          Update Details
        </button>
      </form>

      {/* User Info and Logout Section */}
      <div className="flex justify-around">
        <h1 className="text-white font-semibold text-xl border-2 border-red-500 bg-black p-1 rounded-md">
          ID : <span className="text-red-500">{user.id}</span>
        </h1>
        <h1 className="text-white font-semibold text-xl border-2 border-red-500 bg-black p-1 rounded-md">
          PLACE : <span className="text-red-500">{user.place}</span>
        </h1>
        <button
          className="bg-black text-red-600 border-2 border-red-600 pl-2 pr-2 rounded-sm"
          onClick={handleLogout}
        >
          Logout <Logout />
        </button>
      </div>
    </div>
  );
}

export default DashUserInfo;
