import React, { useState } from 'react'
import DashboardSidebar from '../../component/userDashboardRightcomp'
import DashMainComp from '../../component/DashMainComp'
import DashUserInfo from '../../component/DashUserInfo';

function Dashboard() {

  const [isActive,setIsActive] = useState('My BusInfo');
  return (
    <div className='flex space-x-2 bg-gradient-to-br from-black via-[#220000] to-[#3d0101] h-[91vh] p-4'>
      <div className='flex-[3] bg-black h-full border-2 border-red-700'>
        <DashboardSidebar isActive={isActive} setIsActive={setIsActive}/>
      </div>
      <div className='flex-[8] h-[100px] p-4'>
        {(isActive === "My BusInfo") ? <DashMainComp/> : <DashUserInfo/>}
      </div>
    </div>
  )
}

export default Dashboard
