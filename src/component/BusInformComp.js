import React from "react";
import BusAdminDetails from "./BusAdminDetails.js";
import { CompareArrows, LocationOn } from "@mui/icons-material";

function BusInformComp({ BusItem }) {
  return (
    <div className="flex w-[80vw] justify-between h-auto items-center border-b-2 pb-5 border-red-500">
      <div>
        <h1 className="text-white text-center text-md md:text-2xl font-bold mb-1">
          Bus Number: {BusItem.busNumber}
        </h1>
        <h1 className="text-green-500 text-lg md:text-2xl font-semibold mb-2">{BusItem.route[0]} <CompareArrows/> {BusItem.route[BusItem.route.length - 1]}</h1>
      </div>
      <div className="flex items-center space-x-2 bg-gradient-to-br from-[#320e0e] via-[#111] to-[#350202] border-2 border-red-900 rounded-lg h-[60px] p-4">
        <LocationOn color="success"/>
        <p className="text-white text-2xl font-semibold">
          Current Location : <span className="text-red-500">{BusItem.currentLocation}</span>
        </p>
      </div>
      <div>
        <BusAdminDetails busAdmin={BusItem.busAdmin} />
      </div>
    </div>
  );
}

export default BusInformComp;
