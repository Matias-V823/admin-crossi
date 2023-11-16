//Login.jsx
import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación, por ejemplo, con una solicitud a tu servidor
    // Simularemos un inicio de sesión exitoso después de 2 segundos
    setTimeout(() => {
      setLoggedIn(true);
    }, 2000);
  };

  return (
    <div>
      {loggedIn ? (
        <p>Inicio de sesión exitoso. Redirigiendo...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          <div>
            <label htmlFor="username">Nombre de usuario o correo electrónico:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      )}
    </div>
  );
};

export default Login;
