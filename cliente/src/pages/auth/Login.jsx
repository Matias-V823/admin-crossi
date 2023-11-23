import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {

    event.preventDefault();
    axios.post('http://localhost:3000/api/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        navigate('/maquinas'); //Cambiar esta ruta para redirreccionar al panel de admin
      })
      .catch(error => {
        // Manejar el error de inicio de sesión
        console.error('Error de inicio de sesión', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;
