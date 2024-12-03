import axios from "axios";
import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer.js";
import { DirectionsBus } from "@mui/icons-material";

function AdminMainBus() {
  const [buses, setBuses] = useState([]);
  const [updatedBuses, setUpdatedBuses] = useState({});

  // Fetch buses from API
  const fetchBuses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/getAllBus`,
        { withCredentials: true }
      );
      setBuses(pre=>response.data);
    } catch (error) {
      console.error("Error fetching buses:", error.message);
    }
  };

  // Handle input changes
  const handleChange = (id, field, value) => {
    setUpdatedBuses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Handle update request for a specific bus
  const handleUpdate = async (id) => {
    try {
      const updatedData = updatedBuses[id];
      if (!updatedData) {
        alert("No changes to update for this bus.");
        return;
      }

      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/admin/updateBusdetails/${id}`,
        updatedData,
        { withCredentials: true }
      );

      alert("Bus details updated successfully!");
      setUpdatedBuses((prev) => {
        const newUpdates = { ...prev };
        delete newUpdates[id];
        return newUpdates;
      });

      fetchBuses(); // Refresh data after updating
    } catch (error) {
      console.error("Error updating bus details:", error.message);
      alert("Failed to update bus details. Please try again.");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className="bg-[#0b0202] w-full p-4 border-2 border-red-900">
      {buses.length ? (
        <div>
          {buses.map((bus) => (
            <div
              key={bus._id}
              className="flex justify-evenly items-center h-[60px] bg-[#5c1515] rounded-sm mt-2 mb-8"
            >
              <DirectionsBus style={{ fontSize: "2rem", color: "white" }} />
              {/* Bus Number */}
              <div>
                <input
                  type="text"
                  className="text-white bg-black p-2 rounded-sm border-2 border-red-500"
                  defaultValue={bus.busNumber}
                  onChange={(e) =>
                    handleChange(bus._id, "busNumber", e.target.value)
                  }
                />
              </div>
              {/* Current Location */}
              <div>
                <input
                  type="text"
                  className="text-white bg-black p-2 rounded-sm border-2 border-red-500"
                  defaultValue={bus.currentLocation}
                  onChange={(e) =>
                    handleChange(bus._id, "currentLocation", e.target.value)
                  }
                />
              </div>
              {/* Status */}
              <select
                className="text-white bg-black p-2 rounded-sm border-2 border-red-500"
                defaultValue={bus.status}
                onChange={(e) =>
                  handleChange(bus._id, "status", e.target.value)
                }
              >
                <option value="running">Running</option>
                <option value="maintenance">Maintenance</option>
                <option value="stopped">Stopped</option>
              </select>
              {/* Update Button */}
              <div className="flex justify-end">
                <button
                  className="text-red-600 font-semibold bg-black border-2 border-white p-2 rounded-md"
                  onClick={() => handleUpdate(bus._id)}
                >
                  Update Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
}

export default AdminMainBus;
