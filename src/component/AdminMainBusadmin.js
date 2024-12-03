import { AccountCircle } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminMainBusadmin() {
  const [busAdmin, setBusAdmin] = useState([]); // Store BusAdmin details
  const [buses, setBuses] = useState([]); // Store Bus details
  const [selectedBus, setSelectedBus] = useState({}); // Track selected buses for each BusAdmin

  // Fetch all BusAdmin data
  const fetchBusAdminData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/busAdmin/getAllBusAdmin`,
        { withCredentials: true }
      );
      setBusAdmin(response.data);
    } catch (error) {
      console.error("Error fetching BusAdmin data:", error.message);
    }
  };

  // Fetch all Bus data
  const fetchBusData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/getnotAssignBus`,
        { withCredentials: true }
      );
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching Bus data:", error.message);
    }
  };

  // Update details for a BusAdmin
  const handleUpdateDetails = async (busAdminId,e) => {
    // console.log(e.target.innerText)

    try {
      if(e.target.innerText === 'Update Details') {
        if (!selectedBus[busAdminId]) {
          alert("Please select a bus before updating.");
          return;
        }

        const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/busadmin/assignBus`,
        {
          busNumber: selectedBus[busAdminId],
          busAdminId: busAdminId,
        },
        { withCredentials: true });
      }

      else {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/busadmin/separateLink`,
          {
            busAdminId: busAdminId,
            busNumber: selectedBus[busAdminId],
          },
          { withCredentials: true });
      }

      alert("BusAdmin details updated successfully!");
      fetchBusAdminData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating details:", error.message);
      alert("Failed to update details. Please try again.");
    }
  };

  // Handle dropdown change for selecting a bus
  const handleSelectBus = (busAdminId, busNumber) => {
    setSelectedBus((prev) => ({
      ...prev,
      [busAdminId]: busNumber,
    }));
  };

  useEffect(() => {
    fetchBusAdminData();
    fetchBusData();
  }, []);

  return (
    <div className="w-full m-4 bg-gradient-to-br from-black via-[#3b0101] to-black border-2 border-red-900">
      {busAdmin.map((admin, index) => (
        <div
          key={index}
          className="flex items-center p-4 m-4 rounded-sm border-2 justify-evenly border-red-700 bg-[#100303]"
        >
          <AccountCircle style={{ fontSize: "1.7rem", color: "white" }} />
          <h1 className="text-white text-lg font-semibold">{admin.userName}</h1>
          <h1 className="text-white text-lg font-semibold">{admin.employeeId}</h1>

          {admin.bus === null ? (
            <select
              className="p-1 bg-[#440d0d] text-white rounded-sm"
              value={selectedBus[admin._id] || ""}
              onChange={(e) => handleSelectBus(admin._id, e.target.value)}
            >
              <option value="">Select an Option</option>
              {buses.map((bus, i) => (
                <option key={i} value={bus.busNumber}>
                  {bus.busNumber}
                </option>
              ))}
            </select>
          ) : (
            <div className="pl-2 pr-2 bg-white">{admin.bus.busNumber}</div>
          )}

          {(admin.bus === null) ? <button
            className="bg-red-900 p-1 pl-2 pr-2 rounded-sm text-white"
            onClick={(e) => handleUpdateDetails(admin._id,e)}
          >
            Update Details
          </button> : <button
            className="bg-red-900 p-1 pl-2 pr-2 rounded-sm text-white"
            onClick={(e) => handleUpdateDetails(admin._id,e)}
          >
            Remove Linking
          </button>}
        </div>
      ))}
    </div>
  );
}

export default AdminMainBusadmin;
