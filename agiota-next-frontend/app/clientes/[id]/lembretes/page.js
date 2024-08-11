import Link from "next/link";
import { listarLembretes } from "@/app/lib/funcoes";

export default async function Lembretes({params}) {
    const lembretes = await listarLembretes(params.id);

    if(lembretes != null) {
      return (
        <main className="flex flex-col items-center">
         <h1>Lista de Lembretes do Cliente {params.id}</h1>
          {
            lembretes.map(lembrete => {
              return <div key={lembrete.id}>
                  {lembrete.id} - {lembrete.dataEHoraDeEnvio} ({lembrete.texto})
                  <Link href={`lembretes/delete/${lembrete.id}`}>| Apagar |</Link>
                </div>
             })
          }
        </main>
      );
    } else {
      return (
        <main className="flex flex-col items-center">
            <h1>Lembretes não encontrados.</h1>
        </main>
      )
    }
}