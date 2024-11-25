import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext.js";

function DashUserInfo() {
  const { user } = useContext(LoginContext);
  return (
    <div className="w-full p-2 space-y-5 border-2 border-red-600 bg-gradient-to-br from-[#000000] via-[#150000] to-[#210101]">
      <div className="flex justify-around">
        <div className="space-x-2">
          <label className="text-white ml-2 font-semibold text-lg">
            Student Name:
          </label>
          <input
            type="text"
            className="p-1 bg-red-950 rounded-sm"
            placeholder={user.username}
          />
        </div>
        <div className="space-x-2">
          <label className="text-white font-semibold text-lg">Email:</label>
          <input
            className="p-1 bg-red-950 rounded-sm"
            type="text"
            placeholder={user.email}
          />
        </div>
        <button className="text-white font-semibold p-1 rounded-sm border-2 border-red-500 bg-red-950">
          Update Details
        </button>
      </div>

      <div className="flex justify-around">
        <h1 className="text-white font-semibold text-xl border-2 border-red-500 bg-black p-1 rounded-md">
          ID : <span className="text-red-500">{user.id}</span>
        </h1>
        <h1 className="text-white font-semibold text-xl border-2 border-red-500 bg-black p-1 rounded-md">
          PLACE : <span className="text-red-500">{user.place}</span>
        </h1>
      </div>
    </div>
  );
}

export default DashUserInfo;
