import React, { useState } from "react";

function AdminSidebar({activeTab, setActiveTab}) {
  const tabs = [
    { name: "Bus Management"},
    { name: "BusAdmin Management"},
    { name: "Students Managment" },
    { name: "Add Busses" },
  ];

  return (
    <div className="h-[91vh] w-[300px] bg-gradient-to-br from-black via-[#2a0505] to-red-900 p-4">
      <h1 className="text-2xl text-white font-bold text-center mb-6">
        Sidebar
      </h1>
      <ul className="space-y-4">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <button
              onClick={() => setActiveTab(tab.name)}
              className={`w-full text-left px-4 py-2 rounded-lg font-semibold text-white ${
                activeTab === tab.name
                  ? "bg-red-700"
                  : "bg-[#2a0505] hover:bg-red-800"
              }`}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidebar;
