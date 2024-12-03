import { Info, Logout, Person } from "@mui/icons-material";
import React from "react";

function DashboardSidebar({ isActive, setIsActive }) {
  const handleChange = (e)=>{
    setIsActive(pre => e.target.innerText)
  }

  return (
    <div className="p-4 space-y-10">
      <h1 className="text-center text-white text-lg font-semibold p-2 border-b-2 border-red-600">
        User Dashboard
      </h1>
      <div className="mt-5 space-y-10">
        <div
          className={`flex justify-between items-center rounded-sm text-white font-semibold text-lg p-5 pl-10 pr-10 ${isActive == "My BusInfo" ? `bg-[#b72626]` : `bg-[#230707]`} hover:bg-[#6b1c1c]`}
        onClick={handleChange}>
          My BusInfo
          <Info />
        </div>
        <div className={`flex justify-between items-center rounded-sm text-white font-semibold text-lg p-5 pl-10 pr-10 ${isActive == "User Info" ? `bg-[#b72626]` : `bg-[#230707]`} hover:bg-[#6b1c1c]`}
        onClick={handleChange}>
          User Info
          <Person />
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
