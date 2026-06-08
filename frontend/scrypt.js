const API_URL =
    'http://localhost:3000/todos';

const list =
    document.getElementById('todoList');

const input =
    document.getElementById('todoInput');

const loadBtn =
    document.getElementById('loadBtn');

const addBtn =
    document.getElementById('addBtn');


async function loadTodos() {

    const response =
        await fetch(API_URL);

    const todos =
        await response.json();

    renderTodos(todos);
}




function renderTodos(todos) {

    list.innerHTML = '';

    todos.forEach(todo => {

        const li =
            document.createElement('li');

        li.innerHTML = `
            ${todo.title}

            <div>
                <button onclick="editTodo(${todo.id})">
                    Edit
                </button>

                <button onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;

        list.append(li);
    });
}




async function addTodo() {

    const title = input.value;

    if (!title.trim()) {
        return;
    }

    await fetch(API_URL, {
        method: 'POST',

        headers: {
            'Content-Type':
                'application/json'
        },

        body: JSON.stringify({
            title
        })
    });

    input.value = '';

    loadTodos();
}




async function editTodo(id) {

    const title =
        prompt('New title');

    if (!title) {
        return;
    }

    await fetch(
        `${API_URL}/${id}`,
        {
            method: 'PUT',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({
                title
            })
        }
    );

    loadTodos();
}




async function deleteTodo(id) {

    await fetch(
        `${API_URL}/${id}`,
        {
            method: 'DELETE'
        }
    );

    loadTodos();
}


loadBtn.addEventListener(
    'click',
    loadTodos
);

addBtn.addEventListener(
    'click',
    addTodo
);