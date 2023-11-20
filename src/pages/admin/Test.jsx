import React, { useState } from 'react';
import { RiAddFill, RiDeleteBin2Fill, RiEdit2Line } from 'react-icons/ri';

const Test = () => {
  const [contactos, setContactos] = useState([]);
  const [contactoEditando, setContactoEditando] = useState({
    index: null,
    nombre: '',
    apellido: '',
    email: '',
    ciudad: '',
    telefono: '',
    mensaje: '',
  });

  const agregarContacto = () => {
    const nuevoContacto = {
      nombre: 'Joaquin',
      apellido: 'Torres',
      email: 'correo@example.com',
      ciudad: 'Talca',
      telefono: '+569-1234-5678',
      mensaje: 'Mensaje',
    };

    setContactos([...contactos, nuevoContacto]);
  };

  /*const agregarContacto = () => {
    const nuevoContacto = {
      nombre: prompt('Ingrese el nombre'),
      apellido: prompt('Ingrese el apellido'),
      email: prompt('Ingrese el correo electrónico'),
      ciudad: prompt('Ingrese la ciudad'),
      telefono: prompt('Ingrese el teléfono'),
      mensaje: prompt('Ingrese el mensaje'),
    };

    // Verificar si el usuario ingresó información antes de agregar el contacto
    if (nuevoContacto.nombre && nuevoContacto.apellido && nuevoContacto.email && nuevoContacto.ciudad && nuevoContacto.telefono && nuevoContacto.mensaje) {
        setContactos([...contactos, nuevoContacto]);
      } else {
        alert('Debe ingresar información en todos los campos.');
      }
    };*/


  const editarContacto = (index) => {
    const contactoEnEdicion = contactos[index];
    setContactoEditando({ ...contactoEnEdicion, index });
  };

  const manejarCambioCampo = (campo, valor) => {
    setContactoEditando((prevContactoEditando) => ({
      ...prevContactoEditando,
      [campo]: valor,
    }));
  };

  const guardarEdicion = () => {
    const nuevosContactos = [...contactos];
    nuevosContactos[contactoEditando.index] = { ...contactoEditando };
    setContactos(nuevosContactos);
    cancelarEdicion();
  };

  const cancelarEdicion = () => {
    setContactoEditando({
      index: null,
      nombre: '',
      apellido: '',
      email: '',
      ciudad: '',
      telefono: '',
      mensaje: '',
    });
  };

  const eliminarContacto = (index) => {
    const nuevosContactos = contactos.filter((_, i) => i !== index);
    setContactos(nuevosContactos);
    cancelarEdicion();
  };

  return (
    <div>
      <div className='flex items-center justify-between gap-y-4'>
        <div>
          <h1 className='font-bold text-gray-100 text-xl'>ADMINISTRA TUS CLIENTES</h1>
        </div>
        <div className='flex flex-row gap-2'>
          <button onClick={agregarContacto} className='bg-secondary-100/50 flex items-center gap-2 py-2 px-4 rounded-lg hover'>
            <RiAddFill /> Agregar
          </button>
        </div>
      </div>
      <table className='w-full bg-blue-500 shadow mt-10 table-auto'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Apellido</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Ciudad</th>
            <th className='p-2'>Telefono</th>
            <th className='p-2'>Mensaje</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((contacto, index) => (
            <tr key={index}>
              <td className='p-2'>
                {contactoEditando.index === index ? (
                  <input
                    type='text'
                    value={contactoEditando.nombre}
                    onChange={(e) => manejarCambioCampo('nombre', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  contacto.nombre
                )}
              </td>
              <td className='p-2'>
                {contactoEditando.index === index ? (
                  <input
                    type='text'
                    value={contactoEditando.apellido}
                    onChange={(e) => manejarCambioCampo('apellido', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  contacto.apellido
                )}
              </td>
              <td className='p-2'>
                {contactoEditando.index === index ? (
                  <input
                    type='text'
                    value={contactoEditando.email}
                    onChange={(e) => manejarCambioCampo('email', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  contacto.email
                )}
              </td>
              <td className='p-2'>
                {contactoEditando.index === index ? (
                  <input
                    type='text'
                    value={contactoEditando.ciudad}
                    onChange={(e) => manejarCambioCampo('ciudad', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  contacto.ciudad
                )}
              </td>
              <td className='p-2'>
                {contactoEditando.index === index ? (
                  <input
                    type='text'
                    value={contactoEditando.telefono}
                    onChange={(e) => manejarCambioCampo('telefono', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  contacto.telefono
                )}
              </td>
              <td className='p-2'>
                {contactoEditando.index === index ? (
                  <input
                    type='text'
                    value={contactoEditando.mensaje}
                    onChange={(e) => manejarCambioCampo('mensaje', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  contacto.mensaje
                )}
              </td>
              <td className='p-2 flex justify-end'>
                {contactoEditando.index === index ? (
                  <>
                    <button className='bg-green-500 text-white py-1 px-2 rounded-lg hover' onClick={guardarEdicion}>
                      Save
                    </button>
                    <button className='bg-gray-500 text-white py-1 px-2 rounded-lg hover' onClick={cancelarEdicion}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className='bg-secondary-100/50 py-1 px-2 rounded-lg hover' onClick={() => editarContacto(index)}>
                      <RiEdit2Line /> Edit
                    </button>
                    <button className='bg-secondary-100/50 py-1 px-2 rounded-lg hover' onClick={() => eliminarContacto(index)}>
                      <RiDeleteBin2Fill /> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
