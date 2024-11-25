import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { Person3 } from "@mui/icons-material";

function AdminMainStudent() {

  const [Students, setStudents] = useState([])
  const [Buses,setBuses] = useState([])

  const handleUpdatails = ()=>{
    // axios request
  }

  const fetchStudentData = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/findAllStudents`,{withCredentials:true})
      setStudents(pre=>response.data)
    } catch (error) {
      console.log("error in AdminMainStudent", error.message)
    }
  }

  const fectchBusData = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/getAllBus`,{withCredentials: true})
      setBuses(pre=>response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fectchBusData()
    fetchStudentData()
  },[])

  return (
    <div className="w-full bg-gradient-to-br from-[#130505] via-[#3f0101] to-[#310101] p-4 border-2 border-red-500">
      {Students.map((e,i)=>{
        return <div key={i} className="flex justify-evenly items-center w-full rounded-sm p-2 bg-black">
          <Person3 sx={{ fontSize: "1.7rem",color: "red"}}/>
          <h1 className="text-lg font-seminbold text-white">{e.username}</h1>
          <h1 className="text-lg font-seminbold text-white">{e.id}</h1>
          {(e.bus === null) ? <select className='p-1 bg-[#440d0d] text-white rounded-sm'>
            <option>Select an Option</option>
            {Buses.map((ele,i)=>{
              return <option key={i}>{ele.busNumber}</option>
            })}
          </select> : <div className='pl-2 pr-2 bg-white'>{e.bus.busNumber}</div>}
          <button className='bg-black border-2 border-red-500 p-1 pl-2 pr-2 rounded-sm text-white' onClick={handleUpdatails}>Update Details</button>
        </div>
      })}
    </div>
  );
}

export default AdminMainStudent;
