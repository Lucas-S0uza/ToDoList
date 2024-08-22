const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

// Adiciona uma nova tarefa à lista
function adicionarNovaTarefa() {
  if (input.value.trim() === '') {
    alert('Digite uma tarefa!');
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
        <img src="./img/checked.png" alt="check-na-tarefa" class="check-icon" data-posicao="${posicao}">
        <p>${item.tarefa}</p>
        <img src="./img/trash.png" alt="tarefa-para-o-lixo" class="trash-icon" data-posicao="${posicao}">
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
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
configurarEventos();
