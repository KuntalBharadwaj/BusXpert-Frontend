import React from 'react'

function BusAdminDetails({busAdmin}) {
  return (
    <div className=''>
      {(busAdmin == null) ? <div className='bg-black md:w-[300px] h-[100px] pl-2 pr-2 pb-2 shadow-md shadow-[#592c2c] border-2 border-red-500 rounded-sm text-red-500 font-semibold text-lg flex justify-center items-center'>No Driver Details Found</div>:
      <div className='bg-black md:w-[300px] pl-2 pr-2 pb-2 shadow-md shadow-[#592c2c] border-2 border-red-500 rounded-sm'>
        {/* <h1 className='text-center text-white font-bold text-lg'>...</h1> */}
        <h1 className='text-center text-red-600 text-md md:text-xl font-bold mt-2 mb-2 border-red-700 border-b-2 pb-2'>Bus Admin Info</h1>
        <h1 className='text-center text-white text-sm md:text-lg'><span className='font-bold mb-2'>Name : </span>{busAdmin.userName}</h1>
        <h1 className='text-center text-white text-sm md:text-lg'><span className='font-bold'>Phone No. : </span>{busAdmin.phoneNo}</h1>
      </div>}
    </div>
  )
}

export default BusAdminDetails
