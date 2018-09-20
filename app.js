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
    // DOM load event from localstorage
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks button
    clearBtn.addEventListener('click', clearTasks);
    // Filter task events
    filter.addEventListener('keyup', filterTask);
}

// GET TASK FROM LOCAL STORAGE
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // Create 'li' element
        const li = document.createElement('li');
        // Add class to new li element
        li.className = 'collection-item';
        // Create text node on new li and append
        li.appendChild(document.createTextNode(task));
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
    });    
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

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// ADD TASK TO LOCAL STORAGE
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// REMOVE TASK func
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            // remove also from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR TASKS
function clearTasks(e) {
    // FASTER METHOD ********************
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // taskList.innerHTML = '';
    // clear from local storage
    clearTasksFromLocalStorage();
}

// CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// FILTER TASKS
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}