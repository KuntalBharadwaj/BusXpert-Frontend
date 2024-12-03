import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { Person3 } from "@mui/icons-material";

function AdminMainStudent() {
  const [students, setStudents] = useState([]);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState({}); // Keeps track of selected buses for each student

  // Function to handle updating student details
  const handleUpdateDetails = async (studentId, e) => {
    const busId = selectedBus[studentId]; // Get the selected bus ID for the student
    try {
      if (e.target.innerText === "Update Details") {
        if (!busId) {
          alert("Please select a bus to assign.");
          return;
        }
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/user/assignBus`,
          { studentId, busId },
          { withCredentials: true }
        );
        console.log("Updated Successfully:", response.data);
      } else {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/user/removelink`,
          { studentId, busId },
          { withCredentials: true }
        );
        console.log("Updated Successfully:", response.data);
      }
      fetchStudentData(); // Refresh student data
    } catch (error) {
      console.log("Error updating details:", error.message);
    }
  };

  // Fetch students from API
  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/findAllStudents`,
        { withCredentials: true }
      );
      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching student data:", error.message);
    }
  };

  // Fetch buses from API
  const fetchBusData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/getAllBus`,
        { withCredentials: true }
      );
      setBuses(response.data);
    } catch (error) {
      console.log("Error fetching bus data:", error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBusData();
    fetchStudentData();
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#130505] via-[#3f0101] to-[#310101] p-4 border-2 border-red-500">
      <h1 className="text-2xl font-bold text-white text-center mb-4">
        Student-Bus Assignment
      </h1>
      {students.length === 0 ? (
        <p className="text-white text-center">Loading students...</p>
      ) : (
        students.map((student, index) => (
          <div
            key={index}
            className="flex justify-evenly items-center w-full rounded-sm p-2 mb-2 bg-black"
          >
            <Person3 sx={{ fontSize: "1.7rem", color: "red" }} />
            <h1 className="text-lg font-semibold text-white">
              {student.username}
            </h1>
            <h1 className="text-lg font-semibold text-white">{student.id}</h1>
            {student.bus === null ? (
              <select
                className="p-1 bg-[#440d0d] text-white rounded-sm"
                onChange={(e) =>
                  setSelectedBus((prev) => ({
                    ...prev,
                    [student.id]: e.target.value,
                  }))
                }
              >
                {student.bus === null ? (
                  <option value="">Select a Bus</option>
                ) : (
                  <option value="">{student.bus.busNumber}</option>
                )}
                {buses.map((bus) => {
                  return student.bus != bus ? (
                    <option key={bus._id} value={bus._id}>
                      {bus.busNumber}
                    </option>
                  ) : (
                    <option key={bus._id} value={bus._id}>
                      {bus.busNumber}
                    </option>
                  );
                })}
              </select>
            ) : (
              <div className="pl-2 pr-2 bg-white text-black rounded-sm">
                {student.bus.busNumber}
              </div>
            )}

            {student.bus === null ? (
              <button
                className="bg-black border-2 border-red-500 p-1 pl-2 pr-2 rounded-sm text-white"
                onClick={(e) => handleUpdateDetails(student.id, e)}
              >
                Update Details
              </button>
            ) : (
              <button
                className="bg-black border-2 border-red-500 p-1 pl-2 pr-2 rounded-sm text-white"
                onClick={(e) => handleUpdateDetails(student.id, e)}
              >
                Remove Linking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminMainStudent;
