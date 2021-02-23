
// Get information from the DOM
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

// Assign a new variable for each individual task
var taskIdCounter = 0;

var taskFormHandler = function(event){

	// Prevents the browser from reloading
	event.preventDefault();

	// Get the pertinent values from the form
	var taskNameInput = document.querySelector("input[name='task-name']").value;
	var taskTypeInput = document.querySelector("select[name='task-type']").value;

	// Validate the form
	if (!taskNameInput || !taskTypeInput) {
		alert("Fill out the task form please!");
		return false;
	}

	formEl.reset();

	// Package up data as an object
	var taskDataObj = {
		name: taskNameInput,
		type: taskTypeInput
	};

	// Send it as an argument to createTaskEl
	createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
	// Create list item
	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";

	// Add task id as a custom attribute
	listItemEl.setAttribute("data-task-id", taskIdCounter);

	// Create div to hold task info and add to list item
	var taskInfoEl = document.createElement("div");
	taskInfoEl.className = "task-info";

	// Add HTML content to div
	taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
	listItemEl.appendChild(taskInfoEl);

	var taskActionsEl = createTaskActions(taskIdCounter);
	listItemEl.appendChild(taskActionsEl);

	// Add entire list item to list
	tasksToDoEl.appendChild(listItemEl);

	// Increase task counter for next unique id
	taskIdCounter++;
};

// Create the buttons associated with the unique id in a separate function
var createTaskActions = function(taskId) {
	var actionContainerEl = document.createElement("div");
	actionContainerEl.className = "task-actions";

	// Create edit button
	var editButtonEl = document.createElement("button");
	editButtonEl.textContent = "Edit";
	editButtonEl.className = "btn edit-btn";
	editButtonEl.setAttribute("data-task-id", taskId);
	actionContainerEl.appendChild(editButtonEl);

	// Create delte button
	var deleteButtonEl = document.createElement("button");
	deleteButtonEl.textContent = "Delete";
	deleteButtonEl.className = "btn delete-btn";
	deleteButtonEl.setAttribute("data-task-id", taskId);
	actionContainerEl.appendChild(deleteButtonEl);

	var statusSelectEl = document.createElement("select");
	statusSelectEl.className = "select-status";
	statusSelectEl.setAttribute("name", "status-change");
	statusSelectEl.setAttribute("data-task-id", taskId);
	actionContainerEl.appendChild(statusSelectEl);

	// Create choices for the status build
	var statusChoices = ["To Do", "In Progresss", "Completed"];

	for (var i = 0; i < statusChoices.length; i++) {
	 // Create option element
	 	var statusOptionEl = document.createElement("option");
	 	statusOptionEl.textContent = statusChoices[i];
	 	statusOptionEl.setAttribute("value", statusChoices[i]);
	
		// Append to select
		statusSelectEl.appendChild(statusOptionEl);
	}

	return actionContainerEl;
};

// Function to dictate the behavior of buttons
var taskButtonHandler = function (event) {
	console.log(event.target);

	if (event.target.matches(".delete-btn")) {

		// Get the element's task id
		var taskId = event.target.getAttribute("data-task-id");
		deleteTask(taskId);
	}
};

// Function to delete tasks
var deleteTask = function(taskId){
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "'");
	taskSelected.remove();
};

// Form event handler
formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);
