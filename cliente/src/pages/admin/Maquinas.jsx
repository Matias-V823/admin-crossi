import React from 'react';
import { RiAddFill, RiDeleteBin2Fill, RiEdit2Line } from 'react-icons/ri';

const Maquinas = () => {

  return (
    <div>
      <div className='flex items-center justify-between gap-y-4'>
        <div>
          <h1 className='font-bold text-gray-100 text-xl'>MAQUINAS CROSSI</h1>
        </div> 
        <div className='flex flex-row gap-2'>
          <button className='bg-secondary-100/50 flex items-center gap-2 py-2 px-4 rounded-lg hover'><RiAddFill/> Agregar </button>
          <button className='bg-secondary-100/50 flex items-center gap-2 py-2 px-4 rounded-lg hover'> <RiEdit2Line/>    Editar </button>
          <button className='bg-secondary-100/50 flex items-center gap-2 py-2 px-4 rounded-lg hover'> <RiDeleteBin2Fill/>Eliminar </button>
        </div>
      </div>
      <div className='flex flex-row items-center justify-between mt-[10vh]'>
        <div>
            <img src="/src/assets/maquina_snack_bebestible.png" alt="" />
        </div>
        <div>
          <img src="/src/assets/maquina_bebestible.png" alt="" />
        </div>
        <div>
          <img src="/src/assets/maquina_cafe2.png" alt="" />
        </div>
      </div>
    </div>
  )
};

export default Maquinas;
