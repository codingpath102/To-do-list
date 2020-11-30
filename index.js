/*selectors*/ 
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const container = document.querySelector('.container');
const todoList = document.querySelector('.todo-list');

/*add event*/
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);




/*addTodo function*/
function addTodo(event) {
    /*prevent auto load*/
    event.preventDefault();

    /*todoDiv creation*/
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    /*li creation in todoDiv*/
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);
    /*save localstorage*/
    saveLocalTodos(todoInput.value);

    /*finishBtn in todoDiv*/
    const finishBtn = document.createElement('button');
    finishBtn.innerHTML = '<i class="fas fa-check"></i>';
    finishBtn.classList.add('finish-btn');
    todoDiv.appendChild(finishBtn);

    /*trashBtn in todoDiv*/
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);

    /*clear input value*/
    todoInput.value = '';
}



function deleteCheck(events) {
    const item = events.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    
    if (item.classList[0] === 'finish-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos() {
    let todos;


    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        /*todoDiv creation*/
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    /*li creation in todoDiv*/
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);


    /*finishBtn in todoDiv*/
    const finishBtn = document.createElement('button');
    finishBtn.innerHTML = '<i class="fas fa-check"></i>';
    finishBtn.classList.add('finish-btn');
    todoDiv.appendChild(finishBtn);

    /*trashBtn in todoDiv*/
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

removeLocalTodos(todos);