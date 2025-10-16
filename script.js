const todoList = document.querySelector('#todo-list');
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');

todoForm.addEventListener('submit', formHandler);

function formHandler(event) {
  event.preventDefault();//метод отключил стандартое поведение отправки формы и перезагрузки страницы!!!!
  

  //получаеи наименование продукта из поля ввода
  const taskText = todoInput.value;

  // создаем тег li через разметку
  // const li = `<li class = 'list-item'>${taskText}</li>`;


  //добавляем разметку на страницу
  // todoList.insertAdjacentHTML('beforeEnd', li);

  //создаем тег li с помощью создания элемента
  const newTask = document.createElement('li');
  newTask.classList.add("list-item");
  newTask.innerText = taskText;

//КНОПКА УДАЛИТЬ 
const deleteBtn = document.createElement('button');
deleteBtn.setAttribute('role', 'button');//ДОБАВЛЯТЬ "ROLE BUTTON" ДЛЯ КНОПОК НЕ ОТПРАВЛЯЮЩИХ ФОРМУ А ВСПОМОГАТЕЛЬНОЕ ДЕЙСТВИЕ ВЫПОЛНЯЮЩИЕ
deleteBtn.innerText = 'Удалить';
deleteBtn.style['margin-left'] = '15px';
newTask.append(deleteBtn);
 
//добавляем событие по клику удаление
deleteBtn.addEventListener('click', function () {
  this.closest('li').remove();
});
 

//добавляем элемент на страницу
  todoList.append(newTask);

  //очистка поля ввода
  // todoForm.reset();
  todoInput.value = '';

  //фокус на поле ввода
  todoInput.focus();
}


const counterElement = document.querySelector('#counter');

let counter = 0;//создали нулевую переменную
let timerId;// в глобальной обасти видимости чтоб использовать везде

//START 
const btnStart = document.querySelector('#start');
btnStart.onclick = function () {
  console.log('btnStart');
  timerId = setInterval (function() {
  // counter = counter + 1; добавляем плюс 1 чтоб счетчик считал 
  // counter +=1 ;
   counter++;
   counterElement.innerText = counter;// вкладываем в содержимое дива
 }, 1000);
}

//PAUSE
const btnPause = document.querySelector('#pause');
btnPause.onclick = function () {
  console.log('btnPause');
  clearInterval(timerId);// останавливаем счетчик
}

//RESET
const btnReset = document.querySelector('#reset');
btnReset.onclick = function () {
  console.log('btnReset')
  counter = 0;
  counterElement.innerText = counter;//сбрасываем счетчик до 0
  clearInterval(timerId);
}