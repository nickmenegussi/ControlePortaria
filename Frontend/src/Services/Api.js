const API_URL = "http://localhost:3001/ControlePortaria"; // URL da API

// Função para cadastrar um perfil/morador
export async function cadastrarPerfil(nome, telefone, email, status) {
  const response = await fetch(`${API_URL}/perfil/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, telefone, email, status }),
  });

  return response.json();
}

// Função para listar os perfis/moradores
export async function listarPerfil() {
  const response = await fetch(`${API_URL}/perfil/lista`);
  return response.json();
}

//função para atualizar um perfil/morador
export async function atualizarPerfil(
  idMoradores,
  nome,
  telefone,
  email,
  status
) {
  const response = await fetch(`${API_URL}/perfil/${idMoradores}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, telefone, email, status }),
  });

  return response.json();
}

// Função para deletar um perfil/morador
export async function deletarPerfil(idMoradores) {
  const response = await fetch(`${API_URL}/perfil/${idMoradores}/delete`, {
    method: "DELETE",
  });

  return response.json();
}
