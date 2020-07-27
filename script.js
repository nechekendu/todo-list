//This is the array that will hold the todo list items
let todoitems = [];

//This function will create a new todo object based on the
//text that was entered in the text input, and push it into
//the 'todoItems' array
function renderTodo(todo) {
  localStorage.setItem("todoItemsRef", JSON.stringify(todoItems));
  //Select the first element with a class of 'js-todo-list'
  const list = document.querySelector(".js-todo-list");

  //select the current todo item in the DOM
  const item = document.querySelector(`[data-key='${todo.id}']`);
  //Use the ternary operator to check if 'todo.checked' is true
  //If so, assign 'done' to 'isChecked'. Otherwise, assign an empty string

  //add this if block
  if (todo.deleted) {
    //remove the item from the DOM
    item.remove();

    //
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }

  const isChecked = todo.checked && "done";
  //Create an li element and assign it to 'node'
  const node = document.createElement("li");
  //Set class Attribute
  node.setAttribute("class", `todo-items ${isChecked}`);
  //Set the data-key attribute to the id of the todo
  node.setAttribute("data-key", todo.id);
  //Set the contents of the 'li' element created above
  node.innerHTML = `<input id="${todo.id}" type="checkbox"/>
                      <label for="${todo.id}" class="tick js-tick"></label>
                      <span> ${todo.text} </span>
                      <button class="delete-todo js-delete-todo">
                      <svg><use href="#delete-icon"></use></svg>
                      </button>`;

  //If the item already exists in the DOm
  if (item) {
    //replace it
    list.replaceChild(node, item);
  } else {
    //Append the element to the DOM as the last child of
    //the element referenced by the 'list' variable
    list.append(node);
  }
}

function addTodo(text) {
  const todo = { text, checked: false, id: Date.now() };

  todoitems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoitems.findIndex((item) => item.id === Number(key));

  todoitems[index].checked = !todoitems[index].checked;
  renderTodo(todoitems[index]);
}
function deleteTodo(key) {
  //find the corresponding todo object in the todoItems array
  const index = todoItems.findIndex(item.id === Number(key));
  //Create a new object with properties of the current todo item
  //and a `deleted` property which is set to true
  const todo = {
    deleted: true,
    ...tooItems[index],
  };
  //remove the todo item from the array by filtering it out
  todoItems = todoItems.filter((item) => item.id !== Number(ke));
  renderTodo(todo);
}

//Select the form element
const form = document.querySelector(".js-form");
//Add a submit event listener
form.addEventListener("submit", (event) => {
  //prevent page refresh on form submission
  event.preventDefault();
  //select the text input
  const input = document.querySelector(".js-todo-input");

  //Get the value of the input and remove whitespace
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});
//Select the entire list
const list = document.querySelector(".js-todo-list");
//Add a click event listener to the list and its children
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  } //add this if block
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItemsRef");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});
/*list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
      const itemKey = event.target.parentElement.dataset.key;
      toggleDone(itemKey);
    }
    */
