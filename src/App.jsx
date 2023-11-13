import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Layout
import LayoutAdmin from './layouts/LayoutAdmin'
import LayoutAuth from './layouts/LayoutAuth'


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
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutAdmin/>}> 
            <Route index element={<Home/>} />
            <Route path='/chat' element={<Chat/>} />
            <Route path='/maquinas' element={<Maquinas/>} />
            <Route path='/blog' element={<Blog/>} />
            <Route path='/contactos' element={<Contactos/>} />
          </Route>
          <Route path='*' element={<Error404/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
