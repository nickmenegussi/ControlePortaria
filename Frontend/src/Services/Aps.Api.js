const API_URL = "http://localhost:3001";

// Função para cadastrar um apartamento
export async function cadastrarApartamento(
  numeroApartamento,
  bloco,
  idMorador
) {
  const response = await fetch(`${API_URL}/apartamento/apartamento/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numeroApartamento, bloco, idMorador }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao cadastrar apartamento");
  }

  return data;
}

// Função para listar os apartamentos
export async function listarApartamento() {
  const response = await fetch(`${API_URL}/apartamento/apartamento/lista`);
  return response.json();
}

//função para atualizar um apartamento
export async function atualizarApartamento(
  idApartamento,
  numeroApartamento,
  bloco,
  idMorador
) {
  const response = await fetch(
    `${API_URL}/apartamento/apartamento/${idApartamento}/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numeroApartamento, bloco, idMorador }),
    }
  );

  return response.json();
}

// Função para deletar um apartamento
export async function deletarApartamento(idApartamento) {
  const response = await fetch(
    `${API_URL}/apartamento/apartamento/${idApartamento}/delete`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}
