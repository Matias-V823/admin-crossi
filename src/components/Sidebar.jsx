import React from 'react'
import {RiHome2Line,RiStore2Line,RiContactsBook2Line,RiStickyNoteFill,RiLoginBoxFill} from "react-icons/ri"
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='xl:h-[100vh] fixed xl:static w-full h-full -left-full top-0 flex flex-col justify-between'>
      <div className='flex flex-col items-center justify-center p-8 gap-2 h-[30vh]'>
        <h1 className='text-xl text-white font-bold'>Joaquin Torres</h1>
        <p className='bg-secondary-100 py-1 px-3 rounded-full'>Administrador</p>

      </div>
      <div className='bg-[#064e3b] p-8 rounded-tr-[100px] h-[70vh] text-xl'>
        <nav>
            <Link to="/" className='flex items-center gap-4 py-2 px-4 rounded-xl hover:bg-[#065f46]'>
                <RiHome2Line className='text-white'/> Inicio
            </Link>
            <Link to="/maquinas" className='flex items-center gap-4 py-2 px-4 rounded-xl hover:bg-[#065f46]'>
                <RiStore2Line className='text-white'/> Maquinas
            </Link>
            <Link to="/blog" className='flex items-center gap-4 py-2 px-4 rounded-xl hover:bg-[#065f46]'>
                <RiStickyNoteFill className='text-white'/> Blog
            </Link>
            <Link to="/contactos"className='flex items-center gap-4 py-2 px-4 rounded-xl hover:bg-[#065f46]'>
                <RiContactsBook2Line className='text-white'/> Contactos
            </Link>
            <Link to="/" className='flex items-center gap-4  mt-[450px] py-2 px-4 rounded-xl hover:bg-[#065f46]'>
                <RiLoginBoxFill className='text-white'/> Cerrar sesion
            </Link>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
