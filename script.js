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
deleteBtn.style['font-size'] = '0.5em';
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


// //функция делает запрос по API на сайт отеля проверяет есть ли свободные номера в отеле если да то летим в отпуск
// function checkRooms() {
//   setTimeout(function(){//задержка типа запрос на сервер
//     console.log('проверяем номера в отеле...');
//     const availableRooms = false;
//     // return availableRooms; типа функция сделала запрос на сайт (отработала без fetch) *закоментировала потому что изменили код
    
//     if (availableRooms) {
//       console.log('We have rooms!');
//       console.log('Go to vacaition!!!');
//     } else {
//       console.log('Oh no, we haven\'t rooms');
//       console.log('look next time:(');
   
//    }
//  }, 1000)

// }

// checkRooms();

// ФУНКЦИИ КОЛБЭКИ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function checkRooms(success, failed) {// ФУНКЦИИ КОЛБЭКИ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  setTimeout (function() {
    console.log('Checking rooms in hotel..');
    const availableRooms = true;//типа запросна сайт проверить номера свободные в отеле

    if (availableRooms) {// если есть номера
      let message = 'номера есть!';// вывод сообщения
      success(message);// запуск функции положительной
    } else {
      message = 'номеров нет:(';
      failed(message);//запуск отрицательной функции
    }
  }, 1000)// задержка запрос на сайт 
}

function checkTickets (message, success, failed) {
  setTimeout (function () {
    console.log('---- function checkTickets ----')
    console.log('ответ на предыдущем шаге:', message);

    console.log('Checking tickets..');
    const availableTickets = true;
    
    if (availableTickets) {
      let message = 'We have tickets for you!';
      success(message);
    } else {
      message = 'We don\'t have tickets:(';
      failed(message);
    }
  }, 500)
}

function cancelVacation(message) {//функция положительная 
  console.log('---- cancelVacation ----');//вывод
  console.log('ответ на предыдущем шаге:', message);//вывод
  console.log('отпуск отменяется:(');//вывод
}

function submitlVacation(message) {//функция положительная
  console.log('---- submitVacation ----');
  console.log('ответ на предыдущем шаге:', message);
  console.log('едем в отпуск!!!!');
}

// checkTickets (function(messageFromCheckTickets) {
//   submitlVacation(messageFromCheckTickets)
// }, function(messageFromCheckTickets) {
//   cancelVacation(messageFromCheckRooms)
// }); это превратилось в то что ниже

//---------------------------------------CALL BACK HELL РАЗРАСТАЕТСЯ 

checkRooms //вызов функции checkRooms
  (function(messageFromCheckRooms) { // первый аргумент call back функция
    checkTickets( // при запуске принимает сообщение от checkrooms
      messageFromCheckRooms, // первый агрумент
        function(messageFromCheckTickets){// второй callback функция с параметром мэседж
          submitlVacation(messageFromCheckTickets)// и запустит функции call back в случае успеха и передаст свое сообщение messageFromCheckTickets
        },
        function(messageFromCheckTickets) { 
          cancelVacation(messageFromCheckTickets)// и запустит функции call back в случае неуспеха и передаст свое сообщение messageFromCheckTickets
        })
  }, 
  function(messageFromCheckRooms) { // второй аргумент call back функция если запуск checkRooms неуспешен 
  cancelVacation(messageFromCheckRooms)
});

//--------------------------------------ПРИМЕР СОКРАЩЕННОГО КОДА ВЫШЕ НО ЭТО НЕ РЕШАЕТ ПРОБЛЕМУ CALL BACK HELL(РЕШАЮТ ПРОМИСЫ(ОБЕЩАНИЕ ЧТО ФУНКЦИЯ ВЫПОЛНИТСЯ А ЕСЛИ НЕТ ТО ДРУГАЯ ЗАПУСТИТСЯ))
// checkRooms(
//   function(messageFromCheckRooms) {
//     checkTickets(
//       messageFromCheckRooms,
//       submitlVacation,
//       cancelVacation)
//   },
//   cancelVacation
// );
