import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Shimmer from "./Shimmer.js"
import { DirectionsBus } from '@mui/icons-material'

function AdminMainBus() {

  const handleUpdate = async()=>{
    // const reponse = await axios.put("")
  }

  const [Buses,setBuses] = useState([])

  const fetchBusses = async ()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/getAllBus`,{withCredentials: true})
      setBuses(pre=>response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchBusses()
  },[])

  return (
    <div className='bg-[#0b0202] w-full p-4 border-2 border-red-900'>
      {(Buses.length) ? <div>
        {Buses.map((e,i)=>{
          return <div key={i} className='flex justify-evenly items-center h-[60px] bg-[#5c1515] rounded-sm mt-2 mb-8'>
            <DirectionsBus style={{ fontSize:'2rem', color: 'white' }}/>
            <div><input type='text' className='text-black bg-black p-2 rounded-sm border-2 border-red-500' placeholder={e.busNumber}/></div>
            <div><input type='text' className='text-black bg-black p-2 rounded-sm border-2 border-red-500' placeholder={e.currentLocation}/></div>
            <select className='text-white bg-black p-2 rounded-sm border-2 border-red-500'>
              <option>Running</option>
              <option>Maintenance</option>
              <option>Stopped</option>
            </select>
          </div>
        })}
        <div className='flex justify-end'><button className='text-white font-semibold bg-red-800 p-2 rounded-sm' onClick={handleUpdate}>Update Details</button>1</div>
      </div>: <Shimmer/> }
    </div>
  )
}

export default AdminMainBus