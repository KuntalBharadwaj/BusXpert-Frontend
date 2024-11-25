import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import BusComponent from "../../component/BusComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";

const BusArray = [
  {
    busNumber: "AS02145",
    route: ["collage", "nanakpur", "pinjore", "panchkula", "chandigarh"],
    capacity: 50,
    currentLocation: "xyz",
    status: "running",
  },
  {
    busNumber: "AS02147",
    route: ["collage", "nanakpur", "pinjore", "panchkula", "chandigarh"],
    capacity: 50,
    currentLocation: "xyz",
    status: "maintenence",
  },
  {
    busNumber: "AS02146",
    route: ["collage", "nanakpur", "pinjore", "panchkula", "chandigarh"],
    capacity: 50,
    currentLocation: "xyz",
    status: "stopped",
  },
];

function Home() {
  const navigate = useNavigate();
  const [Busses,setBusses] = useState([])

  const {user} = useContext(LoginContext)

  const handleDashBoardClick = ()=>{
    navigate("/user/dashboard")
  }

  const fetchBusData = async()=>{
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/highlightedBus`,
        { place: user.place},{withCredentials: true}) //axios request
        setBusses(pre=>response.data)
    }
    catch(err) {
      console.log("Error in fetchHighlightBusses", err.message)
    }
  }

  useEffect(()=>{
    fetchBusData()
  },[])

  const handleClick = (e) => {
    navigate(`/user/${e._id}`);
  };

  return (
    <div className="w-full h-[91vh] bg-gradient-to-br from-black via-[#3d0101] to-red-900 flex flex-col lg:flex-row items-center lg:justify-evenly">
      <div className="flex flex-col md:mb-8 mt-2 justify-center">
        <h1 className="text-red-700 font-bold text-3xl md:text-[55px] mb-4">
          Hello Name!
        </h1>
        <h2 className="text-2xl text-white mt-1">Welcome to BusXpert</h2>
        <button onClick={handleDashBoardClick} className="flex justify-start mt-4 w-[150px] bg-gradient-to-tl bg-black via-[#1f0f0f] to-[#150202] p-2 rounded-md text-red-600 border border-red-500 font-semibold">Go to dashboard</button>
      </div>
      <div className="flex-col mr-4">
        {Busses.map((e, i) => {
          return (
            <div
              key={i}
              className="mt-4 mb-2 md:mb-8"
              onClick={() => handleClick(e)}
            >
              <BusComponent Bus={e} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
