import axios from "axios";
import React, { useState } from "react";

const AddedBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [route, setRoute] = useState([""]);

  const handleRouteChange = (index, value) => {
    const newRoute = [...route];
    newRoute[index] = value;
    setRoute(newRoute);
  };

  const addRouteField = () => {
    setRoute([...route, ""]);
  };

  const removeRouteField = (index) => {
    const newRoute = route.filter((_, i) => i !== index);
    setRoute(newRoute);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const newBus = {
        busNumber,
        capacity,
        route,
      };
      
      const response = axios.post(`${process.env.REACT_APP_API_URL}/api/admin/AddedBus`,newBus,{withCredentials: true})
      console.log("New Bus Added:", response.message);
  
      setBusNumber("");
      setCapacity("");
      setRoute([""]);
      alert("Bus successfully added!");
    } catch (error) {
      console.log("Error in BusAdded",error.message)
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-black via-[#2a0505] to-[#4e0101]">
    <div className="flex flex-col items-center w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Add New Bus</h1>
      <form
        className="bg-gradient-to-bl from-black via-[#2a0505] to-[#111] p-6 rounded-lg shadow-lg w-full max-w-md border border-red-900"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Bus Number
          </label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            required
            className="w-full p-2 border border-red-700 rounded-lg bg-[#48020211] text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Capacity
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="w-full p-2 border border-red-700 rounded-lg bg-[#48020211] text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Route
          </label>
          {route.map((stop, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={stop}
                onChange={(e) => handleRouteChange(index, e.target.value)}
                required
                className="flex-1 p-2 border border-red-700 rounded-lg bg-[#48020211] text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {route.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRouteField(index)}
                  className="text-white bg-red-600 hover:bg-red-700 p-1 rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addRouteField}
            className="mt-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Add Stop
          </button>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold"
        >
          Add Bus
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddedBus;
