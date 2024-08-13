"use client";

import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className="inter.className">
        <div className={`layout ${isSidebarOpen ? '' : 'sidebar-open'}`}>
          <aside className={`sidebar ${isSidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
            <nav>
              <ul>
                <li><a href="/">Página Principal</a></li>
                <li><a href="/agiotas/create">Cadastrar agiota</a></li>
                <li><a href="/clientes/create">Cadastrar cliente</a></li>
                <li><a href="/agiotas">Ver agiotas</a></li>
                <li><a href="/clientes">Ver clientes</a></li>
              </ul>
            </nav>
          </aside>
          <main className={`content ${isSidebarOpen ? '' : 'sidebar-open'}`}>
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
