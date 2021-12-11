const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items
loadItems();
// event listeners
eventListeners();

function eventListeners() {
    // submit item
    form.addEventListener('submit', addNewItems);
    // delete item
    taskList.addEventListener('click', addNewItem);
    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

//load items
function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItems(item);
    });
}

// get items from LS
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to LS
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

// delete item from Ls
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

// create Items
function createItems(text) {
    // creat li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // creat a
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);
}

// add new item
function addNewItems(e) {
    if (input.value != '') {
        // creat item
        createItems(input.value);

        // save to LS
        setItemToLS(input.value);

        input.value = '';
    }
    e.preventDefault();
}

// delete item
function addNewItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

// delete all items
function deleteAllItems(e) {
    if (taskList.innerHTML != '') {
        if (confirm('Are you sure?')) {
            while (taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            localStorage.clear();
        }
    } else {
        alert('Empty list!');
    }
}