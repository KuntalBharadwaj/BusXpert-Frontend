import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"; // For collapse icon
import axios from "axios";

const initialStudentList = [
  { Name: "Kuntal Bharadwaj", Id: 2111981107, present: false },
  { Name: "Kuntal", Id: 2111981107, present: false },
  { Name: "Kuntal Bharadwaj", Id: 2111981107, present: false },
  { Name: "Kuntal Bharadwaj", Id: 2111981107, present: false },
  { Name: "Kuntal", Id: 2111981107, present: false },
  { Name: "Kuntal Bharadwaj", Id: 2111981107, present: false },
  { Name: "Kuntal Bharadwaj", Id: 2111981107, present: false },
  { Name: "Kuntal", Id: 2111981107, present: false },
  { Name: "Kuntal Bharadwaj", Id: 2111981107, present: false },
  { Name: "Kuntal Bharadwaj", Id: 2111981107, present: false },
  { Name: "Kuntal", Id: 2111981107, present: false },
  { Name: "Kuntal Bharadwaj", Id: 2111981107, present: false },
];

function StudentList() {
  const [students, setStudents] = useState(initialStudentList);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const fetchStudent = async()=>{
    try {
      // const response = await axios.post("")
    } catch (error) {
      console.log(error.message)
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const handleAttendanceChange = (index) => {
    setStudents((prevStudents) =>
      prevStudents.map((student, i) =>
        i === index ? { ...student, present: !student.present } : student
      )
    );
    setHasChanges(true); 
  };

  const handleSubmit = () => {
    // axios request
    console.log("Data saved:", students);
    setHasChanges(false);
  };

  const totalStudents = students.length;
  const presentCount = students.filter((student) => student.present).length;
  const absentCount = totalStudents - presentCount;

  useEffect(()=>{
    // fetchStudent()
  },[])

  return (
    <div className="flex justify-center bg-gradient-to-br from-black to-red-800">
      <div className="w-[80vw] mt-2 mb-2 p-6 bg-black bg-opacity-80 rounded-md shadow-lg border border-red-600">
        <div className="flex mb-4 items-center cursor-pointer" onClick={toggleCollapse}>
          {isCollapsed ? <AddCircleIcon className="text-red-500" /> : <RemoveCircleIcon className="text-red-500" />}
          <p className="ml-2 font-bold text-xl text-red-400">Student List</p>
        </div>
        {!isCollapsed && (
          <div className="bg-black bg-opacity-70 p-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-3 border-b border-red-500 pb-2">
              <div className="w-1/3">
                <p className="text-lg font-semibold text-red-400">Student Name</p>
              </div>
              <div className="w-1/3 text-center">
                <p className="text-lg font-semibold text-red-400">Student ID</p>
              </div>
              <div className="w-1/3 text-center">
                <p className="text-lg font-semibold text-red-400">Attendance</p>
              </div>
            </div>
            {students.map((student, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="w-1/3 text-gray-300">{student.Name}</div>
                <div className="w-1/3 text-center text-gray-300">{student.Id}</div>
                <div className="w-1/3 text-center">
                  <input
                    type="checkbox"
                    checked={student.present}
                    onChange={() => handleAttendanceChange(index)}
                    className="form-checkbox h-5 w-5 text-red-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-6 text-red-400 font-semibold">
          <div>Total Students: {totalStudents}</div>
          <div>Present Students: {presentCount}</div>
          <div>Absent Students: {absentCount}</div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!hasChanges}
            className={`px-6 py-3 font-bold text-black rounded-lg transition-transform transform ${
              hasChanges
                ? "bg-red-500 hover:bg-red-600 hover:shadow-lg hover:scale-105"
                : "bg-gray-600 cursor-not-allowed opacity-50"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
