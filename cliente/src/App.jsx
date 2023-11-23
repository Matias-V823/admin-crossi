//App.jsx
import React from 'react'
//import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//Layout
import LayoutAdmin from './layouts/LayoutAdmin'
//import LayoutAuth from './layouts/LayoutAuth'


//Pages autentificacion
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Error404 from './pages/Error404'

//Pages admin
import Home from './pages/admin/Home'
import Chat from './pages/admin/Chat'
import Maquinas from './pages/admin/Maquinas'
import Blog from './pages/admin/Blog'
import Contactos from './pages/admin/Contactos'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />

        {/* Rutas protegidas bajo /admin/ */}
        <Route path='/admin/*' element={<LayoutAdmin />}>
          <Route index element={<Home />} />
          <Route path='chat' element={<Chat />} />
          <Route path='maquinas' element={<Maquinas />} />
          <Route path='blog' element={<Blog />} />
          <Route path='contactos' element={<Contactos />} />
        </Route>

        {/* Ruta pública en la raíz */}
        <Route path='/' element={<Home />} />

        {/* Ruta de error 404 */}
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
