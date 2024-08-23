const button = document.querySelector('.c-button--gooey'); // Atualizado para corresponder ao HTML
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

// Adiciona uma nova tarefa à lista
function adicionarNovaTarefa() {
  if (input.value.trim() === '') {
    // Mensagem de erro visual em vez de alert
    document.querySelector('.error-message').textContent = 'Digite uma tarefa!';
    return;
  }

  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = ''; // Limpa o campo de input
  mostrarTarefas();
}

// Mostra as tarefas na lista
function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}">
        <img src="./img/check.png" alt="check-na-tarefa" class="check-icon" data-posicao="${posicao}">
        <p>${item.tarefa}</p>
        <img src="./img/trash.png" alt="tarefa-para-o-lixo" class="trash-icon" data-posicao="${posicao}">
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));

  configurarEventos(); // Reassocia os eventos após atualizar a lista
}

// Marca a tarefa como concluída ou não
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}

// Deleta uma tarefa
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}

// Recarrega as tarefas do localStorage
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');
  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }
  mostrarTarefas();
}

// Configura os event listeners
function configurarEventos() {
  listaCompleta.addEventListener('click', function(event) {
    const target = event.target;
    const posicao = target.getAttribute('data-posicao');

    if (target.classList.contains('check-icon')) {
      concluirTarefa(posicao);
    }

    if (target.classList.contains('trash-icon')) {
      deletarItem(posicao);
    }
  });
}

recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);