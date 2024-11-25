import { Build, DoNotDisturb, RunCircle } from "@mui/icons-material";
import React from "react";

function BusComponent(props) {
  return (
    <div className="p-4 md:w-[660px] lg:w-[900px] rounded-sm w-[300px] shadow-md hover:shadow-md shadow-[#885151] md:h-[150px] h-[150px] bg-[#030303c7] cursor-pointer border border-red-600 ">
      <div className="flex justify-between">
        <h1 className="font-bold mb-2 mr-1 text-xl text-red-500">{`Bus No. ${props.Bus.busNumber}`}</h1>
        <div className="text-lg font-semibold text-white">
            {(props.Bus.status === 'running') ? <div className="flex justify-center items-center space-x-1"><RunCircle sx={{color : "green"}}/><h1>Running</h1></div>: 
            (props.Bus.status === 'stopped') ? <div className="flex justify-center items-center space-x-1"><DoNotDisturb sx={{color : "red"}}/><h1>Stopped</h1></div> : <div className="flex justify-center items-center space-x-1"><Build sx={{color : "yellow"}}/><h1>Maintenance</h1></div>}
        </div>
      </div>
      <div className="">
        <div>
          <h1 className="text-md mb-2 font-semibold text-yellow-200">{`From ${props.Bus.route[0]} to ${props.Bus.route[props.Bus.route.length-1]}`}</h1>
          <h1 className="text-md mb-2 text-white">via
            {props.Bus.route.slice(1,props.Bus.route.length-1).map((e,i)=>{
              return (
              <span key={i}>{` /${e} `}</span>)
            })}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default BusComponent;
