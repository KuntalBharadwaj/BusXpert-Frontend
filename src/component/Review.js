import React from 'react'

function Review() {

  const handleReviewbtn = ()=>{
    // axios request
  }
  return (
      <div className='w-[200px]'>
        <h1 className='mb-2 text-white font-semibold text-lg'>Feedback:</h1>
        <textarea className='text-white bg-[#120303] border-2 border-slate-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500' rows={4} cols={40}/>
        <button onClick={handleReviewbtn} className='w-[80px] mt-1 p-[5px] bg-black rounded-sm text-white font-semibold border-[3px] border-red-500'>Send</button>
      </div>
  )
}

export default Review
