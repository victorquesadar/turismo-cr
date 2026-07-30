import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './features/autenticacion/AuthContext';
import { PanelAuthProvider } from './features/autenticacion/PanelAuthContext';
import { FavoritosProvider } from './features/favoritos/FavoritosContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PanelAuthProvider>
        <FavoritosProvider>
          <App />
        </FavoritosProvider>
      </PanelAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
