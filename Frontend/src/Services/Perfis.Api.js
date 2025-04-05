const API_URL = "http://localhost:3001"; // URL da API

// Função para cadastrar um perfil/morador
export async function cadastrarPerfil(nome, telefone, email, status) {
  const response = await fetch(`${API_URL}/morador/morador/cadastro`, {
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
  const response = await fetch(`${API_URL}/morador/morador/lista`);
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
  const response = await fetch(
    `${API_URL}/morador/morador/${idMoradores}/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, telefone, email, status }),
    }
  );

  return response.json();
}

// Função para deletar um perfil/morador
export async function deletarPerfil(idMoradores) {
  const response = await fetch(
    `${API_URL}/morador/morador/${idMoradores}/delete`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}
