const time = document.querySelector('.time-box .in-time');
const logout = document.querySelector('.btn-logout');
const login = document.querySelector('#login-form');
const id = login.querySelector('.id');
const password = login.querySelector('.password');
const welcome = document.querySelector('#welcome');
const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('.todo-input');
const todoList = todoForm.querySelector('.todo-list');

let userTodoList = [];
let userLoginList = [];


// 시간
function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    time.innerText = `${hour}:${minute}`;
}  

//logout
function clicklogout() {
    todoForm.classList.add('blind');
    login.classList.remove('blind');
    localStorage.removeItem('id');
}

//login
function clickLogin(event) {
    event.preventDefault();
    let userId = id.value;
    let userPassword = password.value;
    const dataLogin = {
        id: userId,
        password: userPassword
    }
    userLoginList.push(dataLogin);
    const setLsLogin = localStorage.setItem('login', JSON.stringify(userLoginList));
    
    id.value = '';
    password.value = '';
    
    pagelogin();
}

//login page
function pagelogin() {
    login.classList.add('blind');
    todoForm.classList.remove('blind');
    localStorageTodo()
}


//localStorage todo list
function localStorageTodo() {
    const getLsTodo = localStorage.getItem('todo');
    if(getLsTodo !== null){
        const paseTodo = JSON.parse(getLsTodo);
        userTodoList = paseTodo;
        paseTodo.forEach(item => {
            printTodo(item);
        });
    }
}

//todo print
function printTodo(newTodo) {
    const todoLi = document.createElement('li');
    todoLi.id = newTodo.id
    const todoLiSpan = document.createElement('span');
    todoLiSpan.innerText = newTodo;
    const todoLiBtn = document.createElement('button');
    todoLiBtn.innerText = '삭제';
    
    todoLi.appendChild(todoLiSpan);
    todoLi.appendChild(todoLiBtn);
    todoList.appendChild(todoLi);
    
    todoLiBtn.addEventListener('click', deleteTodo);
}

//todo 등록 
function clickTodo() {
    const dataId = Date.now();
    const dataText = todoInput.value;
    const dataTodo = {
        id: dataId,
        text: dataText
    }
    userTodoList.push(dataTodo);
    localStorage.setItem('todo', JSON.stringify(userTodoList));
    todoInput.value = '';
    printTodo(dataText);
}

//todo 삭제
function deleteTodo(event) {
    const targetId = event.target.parentNode;
    targetId.remove();
    userTodoList = userTodoList.filter(item => console.log(item.id, parseInt(targetId.id)));
    printTodo(userTodoList)
}


//localStorage
const getLsLogin = localStorage.getItem('login');

if (getLsLogin !== null){
    const paseLsLogin = JSON.parse(getLsLogin);
    pagelogin();
}



todoForm.addEventListener('submit', clickTodo);
login.addEventListener('submit', clickLogin);
logout.addEventListener('click', clicklogout);
logout.addEventListener('click', clicklogout);

getTime();
setInterval(getTime,1000);