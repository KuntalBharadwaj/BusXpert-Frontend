import React, { useContext, useState } from 'react';
import StudentList from '../../component/StudentList';
import { Build, DoNotDisturb, LocationOn, RunCircle } from '@mui/icons-material';
import { LoginContext } from '../../context/LoginContext';
import axios from 'axios';

function BusHome() {
  const { user } = useContext(LoginContext); // Access user from context
  const [status, setStatus] = useState(user?.bus?.status || "stopped"); // Controlled state for bus status
  const [currentLocation, setCurrentLocation] = useState(user?.bus?.currentLocation || ""); // Controlled state for bus location

  const handleChangeStatus = (e) => {
    setStatus(e.target.value); // Update status state
  };

  const handleChangeLocation = (e) => {
    setCurrentLocation(e.target.value); // Update location state
  };

  const handleUpdate = async () => {
    try {
      if (!user?.bus) {
        alert("Bus is not registered yet!");
        return;
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/admin/updateBusdetails/${user.bus._id}`,
        {
          status,
          currentLocation,
        },
        { withCredentials: true }
      );

      alert(response.data.message || "Bus details updated successfully!");
    } catch (error) {
      console.error("Failed to update bus details:", error.message);
      alert("Failed to update bus details. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-red-900 p-6">
      <div className="w-[90vw] bg-black bg-opacity-80 p-6 rounded-md shadow-lg border border-red-600">
        <div className="flex justify-between mb-6">
          {/* Current Location Section */}
          <div className="flex items-center space-x-3">
            <LocationOn color="success" />
            <p className="text-gray-200 rounded shadow-md text-lg">Current Location</p>
            <select
              value={currentLocation} // Controlled select field
              onChange={handleChangeLocation}
              className="bg-black text-red-500 border border-red-500 p-2 rounded shadow focus:outline-none hover:bg-red-500 hover:text-black transition duration-200"
            >
              {user?.bus?.route?.map((location, i) => (
                <option key={i} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Current Bus Status Section */}
          <div className="flex items-center space-x-3">
            {user?.bus?.status === 'stopped' ? (
              <DoNotDisturb sx={{ color: "red" }} />
            ) : user?.bus?.status === 'running' ? (
              <RunCircle color="success" />
            ) : (
              <Build sx={{ color: "orange" }} />
            )}
            <p className="text-gray-200 rounded shadow-md text-lg">Current Bus Status</p>
            <select
              value={status} // Controlled select field
              onChange={handleChangeStatus}
              className="bg-black text-red-500 border border-red-500 p-2 rounded shadow focus:outline-none hover:bg-red-500 hover:text-black transition duration-200"
            >
              <option value="stopped">Stopped</option>
              <option value="maintenance">Maintenance</option>
              <option value="running">Running</option>
            </select>
          </div>

          {/* Bus Number Section */}
          <div className="text-md font-bold font-sans text-red-500 p-3 rounded-md">
            {user?.bus ? (
              <p className="font-semibold text-lg">
                Bus Number: {user.bus.busNumber}
              </p>
            ) : (
              <p className="font-semibold text-lg">Not Registered Yet</p>
            )}
          </div>

          {/* Update Details Button */}
          <div className="flex items-center justify-center">
            <button
              className="p-2 h-[40px] rounded-md text-sm font-semibold text-white bg-red-900"
              onClick={handleUpdate}
            >
              Update Details
            </button>
          </div>
        </div>

        {/* Student List Component */}
        <StudentList />
      </div>
    </div>
  );
}

export default BusHome;
