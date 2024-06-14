'use strict'
//http://localhost:8083/api/categories
//http://localhost:8083/api/todos



const URLencoded = new URLSearchParams();
// can display objects in the URL bar 
/*URLencoded.append("userId", userId.value);
let URLencodedObject = {
    "userId": userId.value
};
*/

const categoriesURL = "http://localhost:8083/api/categories";

document.addEventListener('DOMContentLoaded', () => { 
    const taskCategory = document.getElementById('taskCategory');

    // Function to populate the dropdown
    function populateDropdown(categories) {
        console.log('Populating dropdown with categories:', categories);
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; 
            option.textContent = category.name; 
            taskCategory.appendChild(option);
        });
    }

    // Fetch data from the API
    fetch(categoriesURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data);
            if (Array.isArray(data)) {
                populateDropdown(data);
            } else {
                console.error('Invalid data structure:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });

    // Save Task Button Event Listener
    document.querySelector('.saveTask').addEventListener('click', () => {
        const taskTitle = document.querySelector('.taskTitle')?.value || '';
        const priorityLevel = document.querySelector('.priorityLevel')?.value || '';
        const taskCategoryName = taskCategory.options[taskCategory.selectedIndex].textContent || '';
        const taskDescription = document.querySelector('.taskDescription')?.value || '';

        // Retrieve the current tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add the new task to the array
        tasks.push({
            taskTitle,
            priorityLevel,
            taskCategory: taskCategoryName, 
            taskDescription
        });

        // Save the updated tasks array to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Display the saved tasks
        displayStoredValues();
    });

    // Function to display stored values
    function displayStoredValues() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; 

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';

            const taskName = document.createElement('h4');
            taskName.textContent = task.taskTitle || '';

            const taskPriority = document.createElement('p');
            taskPriority.textContent = task.priorityLevel || '';
            taskPriority.classList.add(getPriorityClass(task.priorityLevel)); 

            const taskCategory = document.createElement('p');
            taskCategory.textContent = task.taskCategory || ''; 

            const taskDesc = document.createElement('p');
            taskDesc.textContent = task.taskDescription || '';

            taskCard.appendChild(taskName);
            taskCard.appendChild(taskPriority);
            taskCard.appendChild(taskCategory);
            taskCard.appendChild(taskDesc);

            taskList.appendChild(taskCard);
        });
    }

    // Function to get CSS class based on priority level
    function getPriorityClass(priorityLevel) {
        switch (priorityLevel) {
            case 'Low Priority':
                return 'priority-low';
            case 'Standard Priority':
                return 'priority-standard';
            case 'Urgent Priority':
                return 'priority-urgent';
            default:
                return ''; 
        }
    }

   
    displayStoredValues();
});
