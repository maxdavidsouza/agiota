'use server'

export async function listarClientes() {
    const response = await fetch('http://localhost:8080/api/clientes', {cache: 'no-store'});
    if (!response.ok) {
        throw new Error('Erro ao carregar clientes');
    }
    const data = await response.json();
    return data;
}

export async function carregarCliente(id) {
  const clienteData = await fetch ('http://localhost:8080/clientes/' + id, { cache: 'no-store' });
  const cliente = await clienteData.json();
  return cliente;
}

export async function cadastrarCliente(formData) {
    try {
      const response = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }