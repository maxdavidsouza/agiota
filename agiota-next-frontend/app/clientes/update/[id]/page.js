'use client'
import { atualizarCliente, carregarCliente } from "@/app/lib/funcoes";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateCliente({params}) {
    const router = useRouter();
    const [erro, setErro] = useState("");
    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        dataDeNascimento: "",
        login: {
        email: "",
        senha: "",
        },
        endereco: {
        cep: "",
        numero: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        },
    });

    useEffect(() => {
        const loadForm = async () => {
            try {
                const response = await carregarCliente(params.id);
                const unFormattedData = {
                    nome: response.nome || "",
                    telefone: response.telefone || "",
                    dataDeNascimento: response.dataDeNascimento || "",
                    login: {
                        email: response.login?.email || "",
                        senha: response.login?.senha || "",
                    },
                    endereco: {
                        cep: response.endereco?.cep || "",
                        numero: response.endereco?.numero || "",
                        rua: response.endereco?.rua || "",
                        bairro: response.endereco?.bairro || "",
                        cidade: response.endereco?.cidade || "",
                        estado: response.endereco?.estado || "",
                    },
                };

                setFormData(unFormattedData);
            } catch (error) {
                console.error("Erro ao carregar cliente:", error);
                setErro("Erro ao carregar dados do cliente.");
            }
        };

        loadForm();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, key] = name.split(".");
    
        if (section && key) {
          setFormData((prev) => ({
            ...prev,
            [section]: {
              ...prev[section],
              [key]: value,
            },
          }));
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
    
        atualizarCliente(params.id, formData)
          .then(
            (result) => {
              console.log('Success:', result);
              router.push('/clientes/'+params.id)
              router.refresh()
            }
          )
          .catch (
            (error) => { 
              const terceiroDoisPontos = error.message.split(':').slice(0, 2).join(':').length + 1;
              const posicaoPontoEVirgula = error.message.indexOf(';', terceiroDoisPontos);
              const mensagemDeErro = error.message.substring(terceiroDoisPontos, posicaoPontoEVirgula).trim();
              mensagemDeErro.split('\n')[0];
              if(mensagemDeErro == "fetch failed")
                setErro("O Servidor está desligado.")
              else
                setErro(mensagemDeErro)
            }
          )
      };
    
      return (
        <main className="flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            <h1>Página de Atualização de Clientes</h1>
            {<h2>{erro}</h2>}
    
            <div>
              <label>Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
    
            <div>
              <label>Telefone:</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>
    
            <div>
              <label>Data de Nascimento:</label>
              <input
                type="date"
                name="dataDeNascimento"
                value={formData.dataDeNascimento}
                onChange={handleChange}
                required
              />
            </div>
    
            <div>
              <h3>Login</h3>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="login.email"
                  value={formData.login.email}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label>Senha:</label>
                <input
                  type="password"
                  name="login.senha"
                  value={formData.login.senha}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
    
            <div>
              <h3>Endereço</h3>
              <div>
                <label>CEP:</label>
                <input
                  type="text"
                  name="endereco.cep"
                  value={formData.endereco.cep}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label>Número:</label>
                <input
                  type="text"
                  name="endereco.numero"
                  value={formData.endereco.numero}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label>Rua:</label>
                <input
                  type="text"
                  name="endereco.rua"
                  value={formData.endereco.rua}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label>Bairro:</label>
                <input
                  type="text"
                  name="endereco.bairro"
                  value={formData.endereco.bairro}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label>Cidade:</label>
                <input
                  type="text"
                  name="endereco.cidade"
                  value={formData.endereco.cidade}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label>Estado:</label>
                <input
                  type="text"
                  name="endereco.estado"
                  value={formData.endereco.estado}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
    
            <button type="submit">
              Atualizar Cliente
            </button>
          </form>
        </main>
      );
}