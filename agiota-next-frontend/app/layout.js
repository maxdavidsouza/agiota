"use client";

import { useState } from 'react';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiHome, FiLogOut, FiMenu, FiX, FiUserPlus } from 'react-icons/fi';

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className="inter.className">
        <div className={`layout ${isSidebarOpen ? 'sidebar-visible' : 'sidebar-closed'}`}>
          <aside className={`sidebar ${isSidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
            <nav>
              <ul>
                <li>
                  <a href="/" style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                    <FiHome size={16} />
                    <span style={{ marginLeft: "4px" }}>Página Principal</span>
                  </a>
                </li>
                <li>
                  <a href="/agiotas/create" style={{ display: 'flex', alignItems: 'center' }}>
                    <FiUserPlus size={16} style={{ marginRight: '8px' }} />
                    Cadastrar usuário
                  </a>
                </li>
                <li><a href="/agiotas">Ver agiotas</a></li>
                <li><a href="/clientes">Ver clientes</a></li>
                <li>
                  <a href="/logout" style={{ display: 'flex', alignItems: 'center' }}>
                    <FiLogOut size={16} style={{ marginRight: '8px' }} />
                    Sair
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
  );
}
