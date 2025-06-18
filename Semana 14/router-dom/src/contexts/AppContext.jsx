import React, { useState } from 'react';

const AppContext = React.createContext();
const { Provider } = AppContext;

function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(() => localStorage.getItem('usuario') || null);

  function login(data) {
    if (data?.username) {
      setUsuario(data.username);
      localStorage.setItem('usuario', data.username);
    }
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem('usuario');
  }

  return (
    <Provider value={{ usuario, login, logout }}>
      {children}
    </Provider>
  );
}

export { AppProvider, AppContext };
