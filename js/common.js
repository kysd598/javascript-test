const time = document.querySelector('.time-box .in-time');
const logout = document.querySelector('.btn-logout');
const login = document.querySelector('#login-form');
const id = login.querySelector('.id');
const password = login.querySelector('.password');
const welcome = document.querySelector('#welcome');
const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('.todo-input');
const todoList = todoForm.querySelector('.todo-list');
const weather = document.querySelector('.weather-box .in-weather');

let userTodoList = [];
let userLoginList = [];
const API_KEY = "bc6906425fb3ed21ccdee7f47316abe2";
const imgArr = ['img1.jpg','img3.jpg','img4.jpg'];


//이미지 램덤
function bgImage() {
    const radomNum = Math.floor(Math.random() * imgArr.length);
    const imgElem = document.createElement('img');
    // imgElem.src = `img/${imgArr[radomNum]}`;
    imgElem.style.backgroundImage  = `url(./img/${imgArr[radomNum]})`;
    imgElem.classList.add('bg_img')
    document.body.prepend(imgElem);
}


// 시간
function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    time.innerText = `${hour}:${minute}`;
}  

// 날씨
function successWeather(position) {
    const lat =  position.coords.latitude;
    const longi = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            weather.innerText = `${data.name} ${Math.floor(data.main.temp)}° ${data.weather[0].main}`;
            console.log(data.main.temp);
            console.log(data.weather[0].main);
        });
}

function errorWeather() {
    console.log("error");
}

function getWeather() {
    navigator.geolocation.getCurrentPosition(successWeather, errorWeather);
}

//logout
function clicklogout() {
    todoForm.classList.add('blind');
    logout.classList.add('blind');
    login.classList.remove('blind');
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
    logout.classList.remove('blind');
    todoForm.classList.remove('blind');
    localStorageTodo();
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
    todoLi.id = newTodo.id;
    const todoLiSpan = document.createElement('span');
    todoLiSpan.innerText = newTodo.text;
    const todoLiBtn = document.createElement('button');
    todoLiBtn.innerText = '완료😍';
    todoLiBtn.classList.add('btn-delete');
    
    todoLi.appendChild(todoLiSpan);
    todoLi.appendChild(todoLiBtn);
    todoList.querySelector('ul').appendChild(todoLi);
    
    todoLiBtn.addEventListener('click', deleteTodo);
}

//todo 등록 
function clickTodo() {
    const todoId = Date.now();
    const todoText = todoInput.value;
    const dataTodo = {
        id: todoId,
        text: todoText
    }
    if(!todoText) {
        alert("오늘 할일을 입력해주세요!");
        return false
    }
    userTodoList.push(dataTodo);
    localStorage.setItem('todo', JSON.stringify(userTodoList));
    todoInput.value = '';
    printTodo(dataTodo);
}

//todo 삭제
function deleteTodo(event) {
    const targetId = event.target.parentNode;
    targetId.remove();
    userTodoList = userTodoList.filter(item => item.id !== parseInt(targetId.id));
    localStorage.setItem('todo', JSON.stringify(userTodoList));
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

getTime();
setInterval(getTime,1000);
getWeather();
bgImage();