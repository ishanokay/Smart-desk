// Get references to the HTML elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const pendingCountSpan = document.getElementById('pending-count');
const clearAllButton = document.getElementById('clear-completed-button'); 
const downloadButton = document.getElementById('download-button'); 

// --- Utility Functions ---

// Function to format the current date and time
function getCurrentDateTime() {
    const now = new Date();
    const dateOptions = { month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    
    const date = now.toLocaleDateString(undefined, dateOptions);
    const time = now.toLocaleTimeString(undefined, timeOptions);
    
    return `${date} at ${time}`;
}

// Update the remaining task count display
function updateCount() {
    const pendingTasks = taskList.querySelectorAll('li:not(.completed)').length;
    pendingCountSpan.textContent = `${pendingTasks} tasks remaining`;
}

// Function to handle the task interactions (complete and delete)
function addEventListeners(listItem, taskSpan, deleteButton) {
    taskSpan.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        updateCount();
    });

    deleteButton.addEventListener('click', () => {
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            taskList.removeChild(listItem);
            updateCount();
        }, 300);
    });
}

// --- Core Functionality ---

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        console.warn("Input is empty. Please enter a task.");
        return;
    }
    
    const creationTime = getCurrentDateTime();
    
    const listItem = document.createElement('li');
    
    const textContainer = document.createElement('div');
    textContainer.classList.add('task-content'); 
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.classList.add('task-text');
    
    const timeStamp = document.createElement('small');
    timeStamp.textContent = creationTime;
    timeStamp.classList.add('timestamp');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add('delete-btn');
    
    textContainer.appendChild(taskSpan);
    textContainer.appendChild(timeStamp);

    listItem.appendChild(textContainer);
    listItem.appendChild(deleteButton);
    taskList.prepend(listItem); 

    taskInput.value = '';
    updateCount();
    addEventListeners(listItem, taskSpan, deleteButton);
}

// --- NEW: Download Functionality (Generates Styled HTML Table) ---
function downloadList() {
    const tasks = taskList.querySelectorAll('li');
    
    if (tasks.length === 0) {
        alert("Your list is empty. Add some tasks first!");
        return;
    }
    
    let tableRows = '';
    
    // Generate the table body rows
    tasks.forEach((item, index) => {
        const isCompleted = item.classList.contains('completed');
        const status = isCompleted ? '✅ DONE' : '❌ PENDING';
        const taskText = item.querySelector('.task-text').textContent;
        const timestamp = item.querySelector('.timestamp').textContent;
        
        const rowStyle = isCompleted 
            ? 'style="background-color: #e6ffec; color: #333; text-decoration: line-through; border-left: 4px solid #2ecc71;"'
            : 'style="background-color: #f9fbfd; color: #222; border-left: 4px solid #3498db;"';
        
        tableRows += `
            <tr ${rowStyle}>
                <td style="padding: 10px; font-weight: 600; width: 10%; text-align: center;">${index + 1}</td>
                <td style="padding: 10px; width: 50%;">${taskText}</td>
                <td style="padding: 10px; width: 20%; text-align: center;">${status}</td>
                <td style="padding: 10px; width: 20%; font-size: 0.9em; color: #7f8c8d;">${timestamp}</td>
            </tr>
        `;
    });

    // Full HTML structure with inline table styling
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>ScaleX To-Do List Export</title>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 30px; }
                h1 { color: #34495e; text-align: center; margin-bottom: 25px; }
                table { width: 100%; border-collapse: collapse; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
                th { background-color: #3498db; color: white; padding: 12px; text-align: left; font-weight: 700; }
                td { border-bottom: 1px solid #eee; }
                tr:last-child td { border-bottom: none; }
                tr:nth-child(even) { background-color: #f7f9fc; }
            </style>
        </head>
        <body>
            <h1>✅ ScaleX Task List Export</h1>
            <table>
                <thead>
                    <tr>
                        <th style="width: 10%;">#</th>
                        <th style="width: 50%;">Task Description</th>
                        <th style="width: 20%; text-align: center;">Status</th>
                        <th style="width: 20%;">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            <p style="text-align: center; margin-top: 30px; color: #7f8c8d;">Data exported on ${getCurrentDateTime()}</p>
        </body>
        </html>
    `;

    // Trigger download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ScaleX_ToDoList_Export.html';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    // Prompt confirmation
    alert("✅ Success! Your beautifully styled list has been downloaded");
}

// --- Event Handlers ---

// Add tasks via button click
addButton.addEventListener('click', addTask);

// Add tasks via Enter key press
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Attach the download function to the button
downloadButton.addEventListener('click', downloadList);

// Clear ALL tasks function
clearAllButton.addEventListener('click', () => {
    const confirmClear = window.confirm("Are you sure you want to clear All tasks? This action cannot be undone.");

    if (confirmClear) {
        taskList.innerHTML = '';
        updateCount();
    }
});

// Initialize count on load
document.addEventListener("DOMContentLoaded", updateCount);