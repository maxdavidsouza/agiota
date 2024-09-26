"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMessageCircle, FiDollarSign, FiBell, FiFilePlus, FiList } from "react-icons/fi";
import { getSession } from "next-auth/react";
import { carregarIdDeUsuarioPorEmail } from "./lib/funcoes";


export default function Home() {
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      const userIdData = await carregarIdDeUsuarioPorEmail(sessionData && sessionData.user ? sessionData.user.email : null);
      setUserId(userIdData);
    };
    fetchSession();
  }, []);

  if (!session) {
    return <p>Você não está logado.</p>;
  }


  const { roles } = session;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 bg-light">
      <div className="dashboard-container">
        <h1 className="mb-4 text-center">Dashboard</h1>
        <div className="row dashboard-cards">
          {roles.includes("agiota") ? (
            <>
              <div className="col-md-4">
                <Link href={`/agiotas/${userId}/mensagens`} className="card dashboard-card shadow-sm" style={{ textDecoration: "none" }}>
                  <div className="card-body text-center">
                    <FiMessageCircle size={40} className="mb-3 text-primary" />
                    <h5 className="card-title">Ver Mensagens Recebidas</h5>
                  </div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link href={`/agiotas/${userId}/emprestimos/create`} className="card dashboard-card shadow-sm" style={{ textDecoration: "none" }}>
                  <div className="card-body text-center">
                    <FiFilePlus size={40} className="mb-3 text-success" />
                    <h5 className="card-title">Cadastrar Empréstimo</h5>
                  </div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link href={`/agiotas/${userId}/emprestimos`} className="card dashboard-card shadow-sm" style={{ textDecoration: "none" }}>
                  <div className="card-body text-center">
                    <FiList size={40} className="mb-3 text-warning" />
                    <h5 className="card-title">Ver Empréstimos Efetuados</h5>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-4">
                  <Link href={`/clientes/${userId}/mensagens`} className="card dashboard-card shadow-sm" style={{ textDecoration: "none" }}>
                  <div className="card-body text-center">
                    <FiMessageCircle size={40} className="mb-3 text-primary" />
                    <h5 className="card-title">Ver Mensagens Recebidas</h5>
                  </div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link href={`/clientes/${userId}/emprestimos/`} className="card dashboard-card shadow-sm" style={{ textDecoration: "none" }}>
                  <div className="card-body text-center">
                    <FiDollarSign size={40} className="mb-3 text-success" />
                    <h5 className="card-title">Ver Empréstimos Aceitos</h5>
                  </div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link href={`/clientes/${userId}/lembretes`} className="card dashboard-card shadow-sm" style={{ textDecoration: "none" }}>
                  <div className="card-body text-center">
                    <FiBell size={40} className="mb-3 text-warning" />
                    <h5 className="card-title">Ver Lembretes Feitos</h5>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
