'use server'

import { getToken, cadastrarUsuarioNoKeycloak, atualizarUsuarioNoKeycloak, removerUsuarioNoKeycloak } from '@/app/lib/keycloakAPI'

//Funções Utilizadas pelo servidor para Alterar/Adquirir dados à partir da API
export async function listarClientes() {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/clientes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }
  catch (erro) {
    console.error("Clientes não encontrados.");
    return null;
  }
}

export async function listarAgiotas() {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/agiotas', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  } 
  catch (erro) {
    console.error("Agiotas não encontrados.");
    return null;
  }
}

export async function listarEmprestimosDeAgiota(agiota_id) {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/agiotas/' + agiota_id + '/emprestimos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos do Agiota não encontrados.");
    return null;
  }
}

export async function listarEmprestimosDeCliente(cliente_id) {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/clientes/' + cliente_id + '/emprestimos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos do Cliente não encontrados.");
    return null;
  }
}

export async function listarEmprestimosPublicos() {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/emprestimos-publicados', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos Públicos não encontrados.");
    return null;
  }
}

export async function listarLembretes(cliente_id) {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/clientes/' + cliente_id + '/lembretes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Lembretes não foram encontrados.");
    return null;
  }
}

export async function carregarCliente(id) {
  const tokenDeAcesso = await getToken();
  try {
    const clienteData = await fetch ('http://localhost:8080/api/clientes/' + id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const cliente = await clienteData.json();
    return cliente;
  }
  catch(erro) {
    console.error("Cliente não encontrado.");
    return null;
  }
}

export async function carregarAgiota(id) {
  const tokenDeAcesso = await getToken();
  try {
    const agiotaData = await fetch ('http://localhost:8080/api/agiotas/' + id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const agiota = await agiotaData.json();
    return agiota;
  }
  catch(erro) {
    console.error("Agiota não encontrado.");
    return null;
  }
}

export async function carregarIdDeAgiotaPorEmail(email) {
  const tokenDeAcesso = await getToken();
  try {
    const agiotaData = await fetch ('http://localhost:8080/api/agiotas/buscar-por-email' + email, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const agiota = await agiotaData.json();
    return agiota;
  }
  catch(erro) {
    console.error("ID de agiota não encontrado.");
    return null;
  }
}

export async function carregarEmprestimoDeAgiota(agiota_id, emprestimo_id) {
  const tokenDeAcesso = await getToken();
  try {
    const emprestimoData = await fetch ('http://localhost:8080/api/agiotas/' + agiota_id + '/emprestimos/' + emprestimo_id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const emprestimo = await emprestimoData.json();
    return emprestimo;
  }
  catch(erro) {
    console.error("Empréstimo de agiota não encontrado.");
    return null;
  }
}

export async function carregarEmprestimoDeCliente(cliente_id, emprestimo_id) {
  const tokenDeAcesso = await getToken();
  try {
    const emprestimoData = await fetch ('http://localhost:8080/api/clientes/' + cliente_id + '/emprestimos/' + emprestimo_id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const emprestimo = await emprestimoData.json();
    return emprestimo;
  }
  catch(erro) {
    console.error("Empréstimo de cliente não encontrado.");
    return null;
  }
}

export async function carregarEmprestimoPublico(emprestimo_id) {
  const tokenDeAcesso = await getToken();
  try {
    const emprestimoData = await fetch ('http://localhost:8080/api/emprestimos-publicados/' + emprestimo_id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const emprestimo = await emprestimoData.json();
    return emprestimo;
  }
  catch(erro) {
    console.error("Empréstimo Público não encontrado.");
    return null;
  }
}

export async function carregarParcela(emprestimo_id, parcela_id) {
  const tokenDeAcesso = await getToken();
  try {
    const emprestimoData = await fetch ('http://localhost:8080/api/emprestimos/' + emprestimo_id + '/parcelas/' + parcela_id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const emprestimo = await emprestimoData.json();
    return emprestimo;
  }
  catch(erro) {
    console.error("Empréstimo Público não encontrado.");
    return null;
  }
}

export async function cadastrarCliente(formData) {
  const tokenDeAcesso = await getToken();

    console.log('JSON enviado:', JSON.stringify(formData, null, 2)); 

    try {
      const response = await fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenDeAcesso}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if(response.ok){
        const result = await response.json();
        await cadastrarUsuarioNoKeycloak(formData.nome, formData.login.email, formData.login.senha, "cliente");
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
}

export async function cadastrarAgiota(formData) {
  const tokenDeAcesso = await getToken();

    console.log('JSON enviado:', JSON.stringify(formData, null, 2));

    try {
      const response = await fetch('http://localhost:8080/api/agiotas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenDeAcesso}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if(response.ok){
        const result = await response.json();
        await cadastrarUsuarioNoKeycloak(formData.nome, formData.login.email, formData.login.senha, "agiota");
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
}

export async function cadastrarEmprestimo(agiota_id, formData) {
  const tokenDeAcesso = await getToken();

  console.log('JSON enviado: ', JSON.stringify(formData, null, 2));

  try {
    const response = await fetch('http://localhost:8080/api/agiotas/'+agiota_id+'/emprestimos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if(response.ok){
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(`Erro: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function cadastrarPagamento(cliente_id, emprestimo_id, parcela_id, formData) {
  const tokenDeAcesso = await getToken();

  console.log('JSON enviado: ', JSON.stringify(formData, null, 2));

  try {
    const response = await fetch('http://localhost:8080/api/clientes/'+cliente_id+'/emprestimos/'+emprestimo_id+'/parcelas/'+parcela_id+'/pagamentos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if(response.ok){
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(`Erro: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function cadastrarLembrete(cliente_id, emprestimo_id, parcela_id, formData) {
  const tokenDeAcesso = await getToken();

  console.log('JSON enviado: ', JSON.stringify(formData, null, 2));

  try {
    const response = await fetch('http://localhost:8080/api/clientes/'+cliente_id+'/emprestimos/'+emprestimo_id+'/parcelas/'+parcela_id+'/gerar-lembrete', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if(response.ok){
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(`Erro: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function atualizarCliente(id, cliente_data) {
  const tokenDeAcesso = await getToken();
  try {
    const usuario = await fetch('http://localhost:8080/api/clientes/'+ id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    const usuarioData = await usuario.json();

    const response = await fetch('http://localhost:8080/api/clientes/' + id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente_data),
    });

    if(response.ok){
      const result = await response.json();
      await atualizarUsuarioNoKeycloak(usuarioData.login.email, cliente_data.nome, cliente_data.login.email, cliente_data.login.senha);
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(`Erro: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function atualizarAgiota(id, agiota_data) {
  const tokenDeAcesso = await getToken();
  try {
    const usuario = await fetch('http://localhost:8080/api/agiotas/'+ id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    const usuarioData = await usuario.json();
    
    const response = await fetch('http://localhost:8080/api/agiotas/' + id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agiota_data),
    });

    if(response.ok){
      const result = await response.json();
      await atualizarUsuarioNoKeycloak(usuarioData.login.email, cliente_data.nome, cliente_data.login.email, cliente_data.login.senha);
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(`Erro: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function darEmprestimo(id, emprestimo_id) {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/agiotas/' + id + '/emprestimos-publicados/' + emprestimo_id + '/firmar-emprestimo', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    if(response.ok){
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(`Erro: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function pedirEmprestimo(id, emprestimo_id) {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/clientes/' + id + '/emprestimos-publicados/' + emprestimo_id + '/firmar-emprestimo', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    if(response.ok){
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(`Erro: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function removerCliente(id) {
  const tokenDeAcesso = await getToken();
  try {

    //Primeiro remova o usuário do Keycloak e posteriormente, do Spring Boot App
    const usuario = await fetch('http://localhost:8080/api/clientes/'+ id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    const usuarioData = await usuario.json();

    const response = await fetch('http://localhost:8080/api/clientes/'+ id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o cliente: ${response.statusText}`);
    }

    await removerUsuarioNoKeycloak(usuarioData.login.email);
    console.log('Cliente deletado com sucesso');
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function removerAgiota(id) {
  const tokenDeAcesso = await getToken();
  try {

    //Primeiro remova o usuário do Keycloak e posteriormente, do Spring Boot App
    const usuario = await fetch('http://localhost:8080/api/agiotas/'+ id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    const usuarioData = await usuario.json();

    const response = await fetch('http://localhost:8080/api/agiotas/'+ id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o agiota: ${response.statusText}`);
    }

    await removerUsuarioNoKeycloak(usuarioData.login.email);
    console.log('Agiota deletado com sucesso');
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function removerEmprestimo(agiota_id, emprestimo_id) {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/agiotas/'+ agiota_id + '/emprestimos/' + emprestimo_id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o empréstimo: ${response.statusText}`);
    }

    console.log('Empréstimo deletado com sucesso');
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function removerLembrete(lembrete_id) {
  const tokenDeAcesso = await getToken();
  try {
    const response = await fetch('http://localhost:8080/api/mensagens/'+ lembrete_id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o lembrete: ${response.statusText}`);
    }

    console.log('Lembrete deletado com sucesso');
  } catch (error) {
    console.error('Erro:', error);
  }
}