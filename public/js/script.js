// script.js

const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const userId = document.getElementById('userId').value;

const addTask = () => {
  const taskContent = inputBox.value;

  if (taskContent === '') {
    alert('You must write something!');
    return;
  }

  // Make an AJAX request to the server to add the task
  fetch('/todo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: taskContent,
    }),
  })
    .then(response => response.json())
    .then(newTask => {
      // Handle the response if needed
      console.log('Task added:', newTask);
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });

  // Update the UI or any other necessary tasks
  let li = document.createElement('li');
  li.innerHTML = taskContent;
  listContainer.appendChild(li);
  let span = document.createElement('span');
  span.innerHTML = '\u00d7';
  li.appendChild(span);

  // Clear input box
  inputBox.value = '';
};

listContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    // Remove the specific task
    e.target.parentElement.remove();
    saveData();
  }
}, false);

const saveData = () => {
  // Create an array to store tasks
  const tasks = [];

  // Iterate through list items and store in array
  document.querySelectorAll('#list-container li').forEach((task) => {
    // Store task content and checked state
    tasks.push({
      content: task.innerHTML,
      checked: task.classList.contains('checked'),
    });
  });

  // Save the array to local storage with the user-specific key
  localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
};

const showTask = () => {
  const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`)) || [];

  // Display tasks from local storage
  tasks.forEach((task) => {
    let li = document.createElement('li');
    li.innerHTML = task.content;

    // Set the checked state based on the stored value
    if (task.checked) {
      li.classList.add('checked');
    }

    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  });
};

showTask();
