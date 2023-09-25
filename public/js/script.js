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

    let stat = 'pendente';
    const task = { title: inputTask.value, status: 'pendente'};

    await fetch('http://localhost:2000/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });

    loadTasks();
}
// deleta a task na api
const deleteTask = async (id) => {
    await fetch(`http://localhost:2000/tasks/${id}`,{
        method: 'delete',
    });
    loadTasks();
}

// Edita o status da task
const updateTask = async ({ id, title, status}) => {
    
    await fetch(`http://localhost:2000/tasks/${id}`,{
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status})
    });

    loadTasks();

}

//Formatar a data
const fromatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short'};

    const date = new Date(dateUTC).toLocaleString('pt-br',options);
    return date;
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
    const tdCreatedAt = createElement('td',fromatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td')

    const select = createSelect(status);

    select.addEventListener('change', ({ target }) => updateTask({...task, status: target.value}));

    const editButton = createElement('button','', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button','', '<span class="material-symbols-outlined">delete</span>');

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateTask({ id, title: editInput.value, status});
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    });
    
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    deleteButton.addEventListener('click', () => deleteTask(id));

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

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();