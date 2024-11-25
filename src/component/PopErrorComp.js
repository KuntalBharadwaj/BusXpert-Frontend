import React from 'react'

function PopErrorComp(props) {
  return (
    <div className='absolute top-1 right-1 w-[200px] h-[100px] border-3 border-red-600'>
        <h1 className='text-xl font-semibold'>Error : {props.message}</h1>
    </div>
  )
}

export default PopErrorComp
