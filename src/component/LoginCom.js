import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext.js";

const LoginCom = () => {
  const { user, setUser } = useContext(LoginContext);

  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === "student") {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/login`,
          formData,
          {withCredentials: true}
        );
        await setUser(pre=>response.data)
        navigate('/user')
      } else if (role === "busadmin") {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/busadmin/login`,
          formData,
          {withCredentials: true}
        );
        await setUser(pre=>response.data)
        navigate('/busadmin')
      } else if (role === "bussuperadmin") {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/login`,
          formData,
          {withCredentials: true}
        );
        await setUser(pre=>response.data)
        navigate('/admin')
      }
      // setUser(pre=>(response.data))
      // navigate('/');
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-red-900">
      <div className="w-full max-w-lg bg-black bg-opacity-90 p-10 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">
          Logged In
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleRoleChange("student")}
            className={`py-2 px-6 rounded-lg font-medium transition duration-200 ${
              role === "student"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => handleRoleChange("busadmin")}
            className={`py-2 px-6 rounded-lg font-medium transition duration-200 ${
              role === "busadmin"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Bus Admin
          </button>
          <button
            onClick={() => handleRoleChange("bussuperadmin")}
            className={`py-2 px-6 rounded-lg font-medium transition duration-200 ${
              role === "bussuperadmin"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Super Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {role === "student" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </>
          )}

          {role === "busadmin" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </>
          )}

          {role === "bussuperadmin" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log In
          </button>
        </form>
        <div className="text-white mt-4 flex justify-center">
          <Link to="/signup">
            Already Have An Account !{" "}
            <span className="text-blue-600">Click Here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginCom;
