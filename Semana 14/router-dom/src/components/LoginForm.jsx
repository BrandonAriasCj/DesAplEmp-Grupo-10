import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';

function LoginForm() {
  const { login, loading, error, user } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  if (user) {
    return <p>Bienvenido, {user.username}</p>;
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Iniciar sesión</h2>

      <input
        type="text"
        value={username}
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border"
      />
      <input
        type="password"
        value={password}
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border"
      />

      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2">
        {loading ? 'Ingresando...' : 'Entrar'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default LoginForm;