import Link from "next/link";
import { listarAgiotas } from "../lib/funcoes.js";

export default async function Agiota() {
    const agiotas = await listarAgiotas();
    if(agiotas != null) {
      return (
        <main className="flex flex-col items-center">
         <h1>Lista de Agiotas</h1>
          {
            agiotas.map(agiota => {
              return <div key={agiota.id}>
                  {agiota.id} - {agiota.nome} ({agiota.login.email})
                  <Link href={`/agiotas/${agiota.id}`}>| Ver Perfil </Link>
                  <Link href={`/agiotas/update/${agiota.id}`}>| Atualizar </Link>
                  <Link href={`/agiotas/delete/${agiota.id}`}>| Apagar |</Link>
                </div>
             })
          }
        </main>
      );
    } else {
      return (
        <main className="flex flex-col items-center">
            <h1>Agiotas não encontrados.</h1>
        </main>
      )
    }
}