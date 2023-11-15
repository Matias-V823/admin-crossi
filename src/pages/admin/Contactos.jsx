import React, { useState, useEffect } from 'react';
import {RiAddFill, RiDeleteBin2Fill,RiEdit2Line} from 'react-icons/ri'



const Contactos = () => {
  return (
    <div>
      <div className='flex items-center justify-between gap-y-4'>
        <div>
          <h1 className='font-bold text-gray-100 text-xl'>ADMINISTRA TUS CLIENTES</h1>
        </div>
        <div className='flex flex-row gap-2'>
          <button className='bg-secondary-100/50 flex items-center gap-2 py-2 px-4 rounded-lg hover'><RiAddFill/> Agregar </button>
          <button className='bg-secondary-100/50 flex items-center gap-2 py-2 px-4 rounded-lg hover'> <RiEdit2Line/>    Editar </button>
          <button className='bg-secondary-100/50 flex items-center gap-2 py-2 px-4 rounded-lg hover'> <RiDeleteBin2Fill/>Eliminar </button>
        </div>
      </div>
      <table className='w-full bg-white shadow mt-10 table-auto'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Apellido</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Ciudad</th>
            <th className='p-2'>Telefono</th>
            <th className='p-2'>Mensaje</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default Contactos
