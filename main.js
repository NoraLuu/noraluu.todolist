const todoInput = document.querySelector("#task");
const todoBtn = document.querySelector("#todoBtnId");
const ulElement = document.querySelector("#todoListId");
const selectElement = document.querySelector(".selectClass");

//Remove disabled from btn when input change
todoInput.addEventListener("keyup", () => {
  if (todoInput.value !== "") {
    todoBtn.removeAttribute("disabled");
  } else {
    todoBtn.setAttribute("disabled", null);
  }
});

//Add new task
const addTodo = (event) => {
  event.preventDefault();

  const divElement = document.createElement("div");
  divElement.classList.add("todoWrapper", "list-group-item");

  const liElement = document.createElement("li");
  liElement.classList.add("mr-auto", "list-group");
  liElement.textContent = todoInput.value;
  divElement.appendChild(liElement);

  saveLocalTodos(todoInput.value);

  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add("btn", "bg-success", "text-white", "mr-1");
  divElement.appendChild(completedBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteBtn.classList.add("btn", "bg-danger", "text-white", "mr-1");
  divElement.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
  editBtn.classList.add("btn", "bg-warning", "text-white", "mr-1");
  divElement.appendChild(editBtn);

  ulElement.appendChild(divElement);
  todoInput.value = "";
};

todoBtn.addEventListener("click", addTodo);

//Handle click btn on to-dos
const checkTodo = (e) => {
  const item = e.target;
  if (item.classList[1] === "bg-danger") {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[1] === "bg-success") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

ulElement.addEventListener("click", checkTodo);

//Select option
const filterTodo = (e) => {
  const todos = [...ulElement.children];
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
};

selectElement.addEventListener("change", filterTodo);

//Save todos to Local Storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const divElement = document.createElement("div");
    divElement.classList.add("todoWrapper", "list-group-item");

    const liElement = document.createElement("li");
    liElement.classList.add("mr-auto", "list-group");
    liElement.textContent = todo;
    divElement.appendChild(liElement);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("btn", "bg-success", "text-white", "mr-1");
    divElement.appendChild(completedBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    deleteBtn.classList.add("btn", "bg-danger", "text-white", "mr-1");
    divElement.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editBtn.classList.add("btn", "bg-warning", "text-white", "mr-1");
    divElement.appendChild(editBtn);

    ulElement.appendChild(divElement);
  });
}

document.addEventListener("DOMContentLoaded", getTodos);

//Remove todos from local storage
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].textContent;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
