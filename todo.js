const addTodo = document.querySelector(".add-button");
const list = document.querySelector(".todo-list");
const allTodos = document.querySelector(".todos");
const addForm = document.querySelector(".add-todo");
document.querySelector(".newDate").valueAsDate = new Date();

// check if the deadline has been missed
const checkDeadline = () => {
  let todoItem = document.querySelectorAll(".when-todo");
  storedTodos.forEach((item, index) => {
    if (dateFns.isPast(item.deadline)) {
      todoItem[index].classList.add("past-due");
    }
    /****** different way to check if the deadline is past-due ********/
    /*let now = new Date();
      let nowStringFormat = dateFns.format(now, 'YYYY-MM-DD HH:mm');
      if (nowStringFormat > item.deadline) {
        todoItem[index].classList.add('past-due');
      }*/
  });
};
setInterval(checkDeadline, 60000);

// template for the todo items
const addItemList = (date, todo, datestamp, id) => {
  const formatDate = dateFns.format(date, "ddd, DD.MM.YYYY HH:mm");
  const formatDatestamp = dateFns.distanceInWordsToNow(datestamp, {
    includeSeconds: true
  });
  const template = `<div class="do-this" id=${id}>
        <div>
            <h2 class="when-todo">${formatDate}</h2>
            <p class="what-todo">${todo}</p>
        </div>
        <div>
            <p class="timestamp">Added: ${formatDatestamp} ago</p>
            <button type="button" class='delete'></button>
        </div>
    </div>`;
  list.innerHTML += template;
};

// show the items on the page
const showItems = array => {
  list.innerHTML = "";
  array.forEach((item, index) => {
    let { deadline, todo, datestamp } = item;
    addItemList(deadline, todo, datestamp, index);
  });
  checkDeadline();
};

window.addEventListener("load", showItems(storedTodos));

allTodos.addEventListener("click", e => {
  e.preventDefault();
  const { target } = e;
  const targetParent = target.parentElement;

  // add a new TODO item
  if (target === addTodo) {
    const newTodo = targetParent.newTodo.value;
    const newDate = targetParent.newDate.value;
    const newTime = targetParent.newTime.value;

    if (newTodo) {
      let deadline = `${newDate} ${newTime}`;
      const datestamp = Date.now();
      const newItem = {
        deadline: deadline,
        todo: newTodo,
        datestamp: datestamp
      };

      storedTodos.push(newItem);
      showItems(storedTodos);
      localStorage.setItem("todos", JSON.stringify(storedTodos));
      addForm.reset();
      document.querySelector(".newDate").valueAsDate = new Date();
    }
  }

  // remove a TODO item
  if (target.classList.contains("delete")) {
    const clicked = targetParent.parentElement;
    const updatedTodos = storedTodos.filter(
      item => item !== storedTodos[clicked.id]
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    storedTodos = JSON.parse(localStorage.getItem("todos"));
    showItems(storedTodos);
  }
  checkDeadline();
});

// search in the todo list
let search = document.querySelector(".search input");

search.addEventListener("keyup", e => {
  if (search.value.length || e.key == "Backspace") {
    storedTodos.forEach((item, index) => {
      let existingTodo = document.getElementById(index);

      if (!item.todo.toLowerCase().includes(search.value.toLowerCase())) {
        existingTodo.classList.add("hide");
      } else if (existingTodo.classList.contains("hide")) {
        existingTodo.classList.remove("hide");
      }
    });
  }
});
