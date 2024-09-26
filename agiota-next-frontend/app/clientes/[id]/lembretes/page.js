import Link from "next/link";
import { listarLembretes, carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Lembretes({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const lembretes = await listarLembretes(params.id);

    if (params.id != userId) {
      redirect("/login");
    }

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