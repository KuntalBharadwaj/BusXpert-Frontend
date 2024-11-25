import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "../../component/Shimmer";
import Review from "../../component/Review";
import axios from "axios";
import BusInformComp from "../../component/BusInformComp";

export const Circle = ({ color }) => {
  return (
    <div
      className={`w-[15px] h-[15px] rounded-[50%]`}
      style={{ backgroundColor: `#${color}` }}
    ></div>
  );
};

function BusDetails() {
  const { Bus_id } = useParams();
  const [BusItem, setBusItem] = useState();

  const [isArrived, setIsArrived] = useState({});

  const fetchBusItem = async () => {
    try {
      const respond = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/findbusbyid`,{id: Bus_id},{withCredentials: true})
      setBusItem(pre=>respond.data)
    } catch (error) {
      console.log("internal Error occur")
    }
  };

  const assignToisArrived = async () => {
    const obj = {};
    BusItem?.route.map((e) => {
      obj[e] = false;
    });

    setIsArrived(pre=> obj);
    console.log(isArrived);
  };

  // current status
  // useEffect(() => {
  //   assignToisArrived();
  // }, [BusItem.length]);

  useEffect(() => {
    fetchBusItem();
  }, []);

  return (
    <div className="p-4 min-h-[91vh] bg-gradient-to-br from-black via-[#2a0505] to-red-900">
      {(BusItem != undefined) ? (
        <div>
          <div className=" flex justify-center">
            <BusInformComp BusItem={BusItem} />
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex w-[60vw] justify-between mt-5 h-auto items-center">
              <div>
                <div className="flex h-auto items-center">
                  <div className="w-[15px] h-[15px] mr-2 bg-[#48fe00]"></div>
                  <h1 className="font-bold text-white">
                    {BusItem.route[0]}
                  </h1>
                </div>
                {BusItem?.route
                  .slice(1, BusItem.route.length - 1)
                  .map((e, i) => {
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
                    {BusItem.route[BusItem.route.length - 1]}
                  </h1>
                </div>
              </div>
              <div className="mt-5">
                <Review />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
}

export default BusDetails;
