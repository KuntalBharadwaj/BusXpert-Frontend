import React, { useState } from 'react'
import AdminSidebar from '../../component/AdminSidebar'
import AdminMainBus from '../../component/AdminMainBus';
import AdminMainBusadmin from '../../component/AdminMainBusadmin';
import AdminMainAdmin from '../../component/AdminMainAdmin';
import AddedBusses from '../../component/AddedBusses';

function AdminHome() {
  const [activeTab, setActiveTab] = useState("Bus Management");

  return (
    <div className='flex'>
        <div>
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
        <div className='flex justify-center p-8 w-full h-[91vh] bg-gradient-to-br from-[#170606] via-[#3d0101] to-red-900'>
          {(activeTab === "Bus Management") ? <AdminMainBus activeTab={activeTab}/>
          : (activeTab === "BusAdmin Management") ? <AdminMainBusadmin/> :
          (activeTab === "Add Busses") ? <AddedBusses/> : <AdminMainAdmin/>
        }
        </div>
    </div>
  )
}

export default AdminHome
