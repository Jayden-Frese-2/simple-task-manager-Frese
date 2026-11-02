const API_URL = '/api/tasks';

const taskForm = document.getElementById('task-form');

const taskInput = document.getElementById('task-input');

const taskList = document.getElementById('task-list');

 

// Fetch and render existing tasks when page loads

async function fetchTasks() {

    try {

        const response = await fetch(API_URL);

        const tasks = await response.json();

       

        taskList.innerHTML = ''; // Clear prior entries

       

        tasks.forEach(task => {

            renderTask(task);

        });

    } catch (error) {

        console.error('Error fetching tasks:', error);

    }

}

 

// Append a single task block to the HTML container

function renderTask(task) {

    const li = document.createElement('li');

    li.innerHTML = `

        <span>${task.text}</span>

        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>

    `;

    taskList.appendChild(li);

}

 

// Handle form submission to create a task (POST)

taskForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const taskText = taskInput.value;

 

    try {

        const response = await fetch(API_URL, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify({ text: taskText })

        });

 

        if (response.ok) {

            const newTask = await response.json();

            renderTask(newTask); // Immediately insert the new task to UI

            taskInput.value = ''; // Reset input field

        }

    } catch (error) {

        console.error('Error adding task:', error);

    }

});

 

// Remove a task using its ID (DELETE)

window.deleteTask = async function(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: 'DELETE'

        });

 

        if (response.ok) {

            // Re-fetch lists to display updated state natively

            fetchTasks();

        }

    } catch (error) {

        console.error('Error deleting task:', error);

    }

};

 

// Initial execution sequence

fetchTasks();