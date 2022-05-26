const taskInput = document.querySelector('.new-task__input');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.querySelector('.tasks_incompleted');
const completedTasksHolder = document.querySelector('.tasks_completed');

function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  checkBox.className = 'input_type_checkbox';
  listItem.className = 'tasks__item list-view';
  deleteButtonImg.className = 'icon icon_remove';
  label.innerText = taskString;
  label.className = 'caption';
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'input_type_text';
  editButton.innerText = 'Edit';
  editButton.className = 'button button_edit';
  deleteButton.className = 'button button_remove';
  deleteButtonImg.src = './remove.svg';

  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

function editTask() {
  window.console.log('Edit Task...');
  window.console.log("Change 'edit' to 'save'");
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type = text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.button_edit');
  const containsClass = listItem.classList.contains('tasks__item_edit-mode');
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  listItem.classList.toggle('tasks__item_edit-mode');
}

function deleteTask() {
  window.console.log('Delete Task...');
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  window.console.log('bind list item events');
  const checkBox = taskListItem.querySelector('input[type = checkbox]');
  const editButton = taskListItem.querySelector('.button_edit');
  const deleteButton = taskListItem.querySelector('.button_remove');
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

function taskCompleted() {
  window.console.log('Complete Task...');
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  window.console.log('Incomplete Task...');
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function addTask() {
  window.console.log('Add Task...');
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
}

addButton.addEventListener('click', addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
