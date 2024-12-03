import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import BusAdminDetails from "./BusAdminDetails";

export const Circle = ({ color }) => {
  return (
    <div
      className={`w-[15px] h-[15px] rounded-[50%]`}
      style={{ backgroundColor: `#${color}` }}
    ></div>
  );
};

function DashMainComp() {
  const { user } = useContext(LoginContext);
  const [bus, setBus] = useState(null);
  const [isArrived,setIsArrived] = useState({})

  const fectchBusData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/findbusbyid`,
        { id: user.bus },
        { withCredentials: true }
      );
      setBus((pre) => response.data);
    } catch (error) {
      console.log("error in fetchBusdata user", error.message);
    }
  };

  const assignToisArrived = async () => {
    const obj = {};
    bus?.route.map((e) => {
      obj[e] = false;
    });

    bus?.route.forEach(e => {
      if(e === bus.currentLocation) obj[e] = true;
    });

    setIsArrived(pre=> obj);
  };

  const handleRefresh = async(req,res)=>{
    fectchBusData()
  }

  useEffect(() => {
    fectchBusData();
  }, []);

  useEffect(()=>{
    assignToisArrived()
  },[bus])

  return (
    <div className="w-full border-2 border-red-600 bg-gradient-to-br from-[#000000] via-[#150000] to-[#210101]">
    {(bus != null) ?
    <div className="flex justify-around p-4">
      <div className="space-y-3">
        <div className="text-white bg-black p-4 border-2 border-red-500">
          BusNumber : {bus.busNumber}
        </div>
        <div className="text-white bg-black p-4 border-2 border-red-500">
          Current Location : {bus.currentLocation}
        </div>
        <div className="text-white bg-black p-4 border-2 border-red-500">
          Status : {bus.status}
        </div>
        <div className="text-white bg-black p-4 border-2 border-red-500">
          Capacity : {bus.capacity}
        </div>
      </div>

      <BusAdminDetails busAdmin={bus.busAdmin} />

      <div>
        <div className="flex h-auto items-center">
          <div className="w-[15px] h-[15px] mr-2 bg-[#48fe00]"></div>
          <h1 className="font-bold text-white">{bus.route[0]}</h1>
        </div>
        {bus?.route.slice(1, bus.route.length - 1).map((e, i) => {
          return (
            <div key={i}>
              {isArrived[e] ? (
                <div className="w-[7px] border-2 border-red-700 rounded-md h-[50px] bg-[#48fe00] ml-[5px]"></div>
              ) : (
                <div className="w-[7px] border-2 border-red-700 rounded-md h-[50px] bg-white ml-[5px]"></div>
              )}
              <div className="mr-2 flex h-auto items-center">
                {isArrived[e] ? (
                  <div className="border-2 border-red-700 rounded-lg">
                    <Circle color="48fe00" />
                  </div>
                ) : (
                  <div className="border-2 border-red-700 rounded-lg">
                    <Circle color="FFFFFF" />
                  </div>
                )}
                <h1 className="ml-2 font-bold text-white">{e}</h1>
              </div>
            </div>
          );
        })}
        <div className="w-[7px] border-2 border-red-700 rounded-md h-[50px] bg-white ml-[5px]"></div>
        <div className="flex h-auto items-center">
          <div className="w-[15px] h-[15px] mr-2 bg-[#48fe00]"></div>
          <h1 className="font-bold text-white">
            {bus.route[bus.route.length - 1]}
          </h1>
        </div>
      </div>
      </div> : <h1 className="text-center text-white">Looding .....</h1>}
    <button className="p-2 bg-red-600 mb-2 ml-2 rounded-sm font-semibold" onClick={handleRefresh}>Refresh Button</button>
    </div>
  );
}

export default DashMainComp;
