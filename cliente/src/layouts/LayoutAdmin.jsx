import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const LayoutAdmin = () => {
  return (
    <div className='min-h-screen grid  grid-cols-1   xl:grid-cols-6'>
      <Sidebar/>
      <div className='xl:col-span-5'>
        <Header/>
        <div className='h-[90vh] overflow-y-scroll p-8'>
          <Outlet /> {/* Utiliza Outlet para renderizar páginas secundarias */}
        </div>
      </div>
    </div>
  )
}

export default LayoutAdmin
