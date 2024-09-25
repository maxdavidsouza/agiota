"use client";

import { useState, useEffect } from 'react';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiHome, FiLogOut, FiMenu, FiX, FiUserPlus } from 'react-icons/fi';
import AuthStatus from './components/AuthStatus';
import SessionProviderWrapper from './utils/SessionProviderWrapper';
import { getSession } from 'next-auth/react';

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderMenuItems = () => {
    if (session) {
      const { roles } = session;
      if (roles.includes("gerente")) {
        return (
          <>
            <li>
              <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <FiHome size={16} style={{ marginRight: '8px' }} />
                Página Principal
              </a>
            </li>
            <li>
              <a href="/usuarios/create" style={{ display: 'flex', alignItems: 'center' }}>
                <FiUserPlus size={16} style={{ marginRight: '8px' }} />
                Cadastrar usuário
              </a>
            </li>
            <li>
              <a href="/agiotas" style={{ display: 'flex', alignItems: 'center' }}>
                <FiUserPlus size={16} style={{ marginRight: '8px' }} />
                Ver agiotas
              </a>
            </li>
            <li>
              <a href="/clientes" style={{ display: 'flex', alignItems: 'center' }}>
                <FiUserPlus size={16} style={{ marginRight: '8px' }} />
                Ver clientes
              </a>
            </li>
          </>
        );
      } else if (roles.includes("agiota")) {
        return (
          <>
            <li>
              <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <FiHome size={16} style={{ marginRight: '8px' }} />
                Página Principal
              </a>
            </li>
            <li>
              <a href="/agiotas" style={{ display: 'flex', alignItems: 'center' }}>
                <FiUserPlus size={16} style={{ marginRight: '8px' }} />
                Ver agiotas
              </a>
            </li>
          </>
        );
      } else if (roles.includes("cliente")) {
        return (
          <>
            <li>
              <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <FiHome size={16} style={{ marginRight: '8px' }} />
                Página Principal
              </a>
            </li>
            <li>
              <a href="/clientes" style={{ display: 'flex', alignItems: 'center' }}>
                <FiUserPlus size={16} style={{ marginRight: '8px' }} />
                Ver clientes
              </a>
            </li>
          </>
        );
      }
    }
    return null;
  };

  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className="inter.className">
          <div className={`layout ${isSidebarOpen ? 'sidebar-visible' : 'sidebar-closed'}`}>
            <aside className={`sidebar ${isSidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
              <nav>
                <ul>
                  {renderMenuItems()}
                  <li>
                    <a className="text-white" style={{ display: 'flex', alignItems: 'center' }}>
                      <FiLogOut size={16} style={{ marginRight: '8px' }} />
                      <AuthStatus />
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>
            <main className={`content`} style={{ marginTop: "-20px", marginBottom: "-20px", marginRight: '-20px' }}>
              <button onClick={toggleSidebar} className="toggle-btn">
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              {children}
            </main>
          </div>
          <footer>
            <p>&copy; 2024 UFAPE. Todos os direitos reservados.</p>
          </footer>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
