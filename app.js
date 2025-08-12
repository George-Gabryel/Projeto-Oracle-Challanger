let todosAmigos = []; // Armazena todos os nomes já adicionados
let amigosDisponiveis = []; // Armazena apenas os nomes disponíveis para sorteio

function adicionarAmigo() {
  const input = document.getElementById('amigo');
  const nome = input.value.trim();

  if (!nome) {
    alert("Por favor, digite um nome válido!");
    return;
  }

  // Verifica se o nome já existe (ignorando maiúsculas/minúsculas)
  const nomeJaExiste = todosAmigos.some(amigo => 
    amigo.toLowerCase() === nome.toLowerCase()
  );

  if (nomeJaExiste) {
    alert("Este nome já foi adicionado!");
    return;
  }

  // Adiciona aos arrays
  todosAmigos.push(nome);
  amigosDisponiveis.push(nome);
  
  input.value = "";
  input.focus();
  mostrarLista();
}

function mostrarLista() {
  const lista = document.getElementById('listaAmigos');
  lista.innerHTML = '';

  if (todosAmigos.length === 0) {
    lista.innerHTML = '<div class="empty-message">Nenhum participante adicionado ainda</div>';
    return;
  }

  todosAmigos.forEach((amigo, index) => {
    const participantRow = document.createElement('div');
    participantRow.className = 'table-row';
    
    // Verifica se o amigo está disponível para sorteio
    const disponivel = amigosDisponiveis.includes(amigo);
    const statusClass = disponivel ? 'disponivel' : 'sorteado';
    
    participantRow.innerHTML = `
      <span>${index + 1}</span>
      <span class="${statusClass}">${amigo}</span>
      <div>
        ${disponivel ? 
          `<button onclick="removerAmigo(${index})" class="button-remove">
            Remover
          </button>` : 
          `<button onclick="readicionarAmigo('${amigo}')" class="button-readd">
            Readicionar
          </button>`
        }
      </div>
    `;
    lista.appendChild(participantRow);
  });
}

function removerAmigo(index) {
  const nome = todosAmigos[index];
  
  // Remove de ambas as listas
  todosAmigos.splice(index, 1);
  amigosDisponiveis = amigosDisponiveis.filter(a => a !== nome);
  
  mostrarLista();
}

function readicionarAmigo(nome) {
  if (!amigosDisponiveis.includes(nome)) {
    amigosDisponiveis.push(nome);
    mostrarLista();
  }
}

function sortearAmigo() {
  if (amigosDisponiveis.length === 0) {
    alert("Todos os amigos já foram sorteados! Adicione mais nomes ou readicione alguns.");
    return;
  }

  // Sorteia um índice aleatório
  const indiceSorteado = Math.floor(Math.random() * amigosDisponiveis.length);
  const amigoSorteado = amigosDisponiveis[indiceSorteado];

  // Remove o amigo sorteado da lista de disponíveis
  amigosDisponiveis = amigosDisponiveis.filter(a => a !== amigoSorteado);

  // Mostra o resultado
  const resultado = document.querySelector('.result-content');
  resultado.innerHTML = `
    <div class="result-item">
      <span>🎉 ${amigoSorteado} foi sorteado(a)! 🎉</span>
    </div>
  `;

  // Atualiza a lista
  mostrarLista();
}