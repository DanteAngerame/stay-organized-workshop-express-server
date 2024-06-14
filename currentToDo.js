'use strict'


document.addEventListener('DOMContentLoaded', () => {
    function displayStoredValues() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; 

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach((task, index) => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';

            const taskContent = document.createElement('div');
            taskContent.className = 'task-content';

            const taskName = document.createElement('h4');
            taskName.textContent = task.taskTitle || '';

            const taskPriority = document.createElement('p');
            taskPriority.textContent = task.priorityLevel || '';
            taskPriority.classList.add(getPriorityClass(task.priorityLevel)); 

            const taskCategory = document.createElement('p');
            taskCategory.textContent = task.taskCategory || ''; 

            const taskDesc = document.createElement('p');
            taskDesc.textContent = task.taskDescription || '';

            const removeTaskButton = document.createElement('button');
            removeTaskButton.className = 'remove-task';
            removeTaskButton.textContent = 'Mark as Completed';
            removeTaskButton.addEventListener('click', () => {
                removeTask(index);
            });

            taskContent.appendChild(taskName);
            taskContent.appendChild(taskPriority);
            taskContent.appendChild(taskCategory);
            taskContent.appendChild(taskDesc);

            taskCard.appendChild(taskContent);
            taskCard.appendChild(removeTaskButton);

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
                return ''; // Default color or no class applied
        }
    }

    // Function to remove a task
    function removeTask(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1); // Remove the task at the specified index
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
        displayStoredValues(); // Refresh the displayed task list
    }

    // Display stored values on page load
    displayStoredValues();
});
