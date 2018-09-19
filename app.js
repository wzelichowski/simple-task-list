// UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task'); // new task form input field

// Load all event listeners
loadEventListeners();

// Load all event listeners function:
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks button
    clearBtn.addEventListener('click', clearTasks);
}

// ADD TASK func
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add task!');
    }

    // Create 'li' element
    const li = document.createElement('li');
    // Add class to new li element
    li.className = 'collection-item';
    // Create text node on new li and append
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element (with delete icon)
    const link = document.createElement('a');
    // Add a class to new link (scondary-content = align to right)
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    // Append link to li
    li.appendChild(link);

    // Append new li to UL
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// REMOVE TASK func
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

//CLEAR TASKS
function clearTasks(e) {
    // FASTER METHOD ********************
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // taskList.innerHTML = '';
}