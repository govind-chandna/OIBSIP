// Selecting HTML Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

// Store all tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks in Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark task as completed");

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task Text
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        // Action Buttons
        const actions = document.createElement("div");
        actions.className = "task-actions";

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function () {
            const updatedText = prompt("Edit your task:", task.text);

            if (updatedText === null) {
                return;
            }

            if (updatedText.trim() === "") {
                alert("Task cannot be empty!");
                return;
            }

            task.text = updatedText.trim();

            saveTasks();
            displayTasks();
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            const confirmDelete = confirm(
                "Are you sure you want to delete this task?"
            );

            if (confirmDelete) {
                tasks = tasks.filter(function (item) {
                    return item.id !== task.id;
                });

                saveTasks();
                displayTasks();
            }
        });

        actions.append(editBtn, deleteBtn);

        li.append(checkbox, span, actions);
        taskList.appendChild(li);
    });

    // Update task counts
    const completedCount = tasks.filter(function (task) {
        return task.completed;
    }).length;

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completedCount;
    pendingTasks.textContent = tasks.length - completedCount;

    // Show or hide empty message
    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now() + Math.random(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Add Task Button
addTaskBtn.addEventListener("click", addTask);

// Press Enter to add a task
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Display saved tasks when page loads
displayTasks();