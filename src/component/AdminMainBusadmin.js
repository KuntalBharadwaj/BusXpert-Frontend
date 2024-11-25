import { AccountCircle } from '@mui/icons-material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdminMainBusadmin() {

  const [BusAdmin, setBusAdmin] = useState([]);
  const [Buses,setBuses] = useState([])

  const handleUpdatails = async()=>{
    
  }

  const fetchBusAdminData = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/busAdmin/getAllBusAdmin`,{withCredentials: true})
      setBusAdmin(pre=>response.data)
    } catch (error) {
      console.log(error.message)
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
    fetchBusAdminData()
    fectchBusData()
  },[])

  return (
    <div className='w-full m-4 bg-gradient-to-br from-black via-[#3b0101] to-black border-2 border-red-900'>
      {BusAdmin.map((e,i)=>{
        return <div key={i} className='flex items-center p-4 m-4 rounded-sm border-2 justify-evenly border-red-700 bg-[#100303]'>
          <AccountCircle style={{fontSize:"1.7rem" ,color : "white"}}/>
          <h1 className='text-white text-lg font-semibold'>{e.userName}</h1>
          <h1 className='text-white text-lg font-semibold'>{e.employeeId}</h1>
          {(e.bus === null) ? <select className='p-1 bg-[#440d0d] text-white rounded-sm'>
            <option>Select an Option</option>
            {Buses.map((ele,i)=>{
              return <option key={i}>{ele.busNumber}</option>
            })}
          </select> : <div className='pl-2 pr-2 bg-white'>busNumber</div>}
          <button className='bg-red-900 p-1 pl-2 pr-2 rounded-sm text-white' onClick={handleUpdatails}>Update Details</button>
        </div>
      })}
    </div>
  )
}

export default AdminMainBusadmin
