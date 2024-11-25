import React, { useContext, useState } from 'react';
import StudentList from '../../component/StudentList';
import { Build, DoNotDisturb, LocationOn, RunCircle } from '@mui/icons-material';
import { LoginContext } from '../../context/LoginContext';

function BusHome() {
  const [status,setStatus] = useState("stopped")
  const {user} = useContext(LoginContext)

  const handleChange = (e)=>{
    setStatus(e.target.value);
  }

  const handleUpdate = ()=>{
    try {
      // axios request
    } catch (error) {
      
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-red-900 p-6">
      <div className="w-[90vw] bg-black bg-opacity-80 p-6 rounded-md shadow-lg border border-red-600">
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-3">
            <LocationOn color="success"/>
            <p className="text-gray-200 rounded shadow-md text-lg">Current Location</p>
            <p></p>
            <select className="bg-black text-red-500 border border-red-500 p-2 rounded shadow focus:outline-none hover:bg-red-500 hover:text-black transition duration-200">
              <option>Panchkula</option>
              <option>Chandigarh</option>
              <option>Chitkara</option>
            </select>
          </div>
          <div className='flex items-center space-x-3'>
          {(status === 'stopped') ? <DoNotDisturb sx={{ color: "red" }}/>: 
            (status === 'running') ? <RunCircle color='success'/>:
            <Build sx={{ color: "orange" }}/>
          }
          <p className="text-gray-200 rounded shadow-md text-lg">Current BusStatus</p>
          <select onChange={handleChange} className="bg-black text-red-500 border border-red-500 p-2 rounded shadow focus:outline-none hover:bg-red-500 hover:text-black transition duration-200">
              <option value="stopped">Stopped</option>
              <option value="maintenence">Maintenance</option>
              <option value="running">Running</option>
            </select>
            </div>

          <div className="text-md font-bold font-sans text-red-500 p-3 rounded-md">
            {(user.bus == null)? <p className="font-semibold text-lg">Not Register Yet <span className="font-normal text-lg"></span></p> : <p className="font-semibold text-lg">Bus Number: {user.bus.busNumber} <span className="font-normal text-lg"></span></p>}
          </div>
          <div className='flex items-center justify-center'>
          <button className='p-2 h-[40px] rounded-md text-sm font-semibold text-white bg-red-900' onClick={handleUpdate}>Update Details</button>
          </div>
        </div>
        <StudentList />
      </div>
    </div>
  );
}

export default BusHome;
