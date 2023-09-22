const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

// Requisição a API
const fetchtasks = async () => {
    const response = await fetch('http://localhost:2000/tasks');
    const tasks = await response.json();

    return tasks;
}

// Adicionar task na API
const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value, status: 'pendente'};

    await fetch('http://localhost:2000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });

    loadTasks();
}

// Cria e preenche um elemento HTML 
const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if(innerText) {
        element.innerText = innerText;
    }

    if(innerHTML){ 
        element.innerHTML = innerHTML;
    }

    return element;
}

// Função para criar o select
const createSelect = (value) => {

    const options = `
        <option value="pendente">pendente</option>
        <option value="em andamento">em andamento</option>
        <option value="concluído">concluído</option>
    ` ;
    const select = createElement('select', '', options);

    select.value = value;
    return select;
}

// Cria o Html da task
const createRow = (task) => {
    const { id, title, created_at, status} = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td',title);
    const tdCreatedAt = createElement('td',created_at)
    const tdStatus = createElement('td');
    const tdActions = createElement('td')

    const select = createSelect(status);

    const editButton = createElement('button','', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button','', '<span class="material-symbols-outlined">delete</span>');
    
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    tdStatus.appendChild(select);

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
}

// Carregar as tasks na tela
const loadTasks = async () => {
    const tasks = await fetchtasks();

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}
loadTasks();