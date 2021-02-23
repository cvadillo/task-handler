
// Get information from the DOM
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed")

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

	var isEdit = formEl.hasAttribute("data-task-id");

	if (isEdit) {
		// If the data has an attribute, thet the task ID and call a function to complete the edit process
		var taskId = formEl.getAttribute("data-task-id");
		completeEditTask(taskNameInput, taskTypeInput, taskId);
	} else {
	// There is no data attribute, so we create the object as normal and pass to createTaskEl function
	// Package up data as an object
		var taskDataObj = {
		name: taskNameInput,
		type: taskTypeInput
		}
		
		// Send it as an argument to createTaskEl
		createTaskEl(taskDataObj);
	};
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
	// Get target element from event
	var targetEl = event.target;

	// If edit button is clicked
	if (targetEl.matches(".edit-btn")) {
		var taskId = targetEl.getAttribute("data-task-id");
		editTask(taskId);
	} 
	// If delete button was clicked
	else if (targetEl.matches(".delete-btn")) {
		var taskId = targetEl.getAttribute("data-task-id");
		deleteTask(taskId);
	}
};

// Function to delete tasks
var deleteTask = function(taskId) {
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
	taskSelected.remove();
};

var editTask = function(taskId) {
	// Get task list item element
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

	// Get content from task name and type and re-assign it so it can be updated
	var taskName = taskSelected.querySelector("h3.task-name").textContent;
	document.querySelector("input[name='task-name']").value = taskName;

	var taskType = taskSelected.querySelector("span.task-type").textContent;
	document.querySelector("select[name='task-type']").value = taskType;

	// Change the text of the Add Task button to Save Task
	document.querySelector("#save-task").textContent = "Save Task";

	formEl.setAttribute("data-task-id", taskId);
};

var completeEditTask = function (taskName, taskType, taskId) {
	// find the matching task list item
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

	//set new values
	taskSelected.querySelector("h3.task-name").textContent = taskName;
	taskSelected.querySelector("span.task-type").textContent = taskType;

	alert("Your Task Was Updated!");
};

var taskStatusChangeHandler = function(event) {
	// Get the id of the task that is being modified
	var taskId = event.target.getAttribute("data-task-id");

	// Get the currently selected option's value and convert to lowercase
	var statusValue = event.target.value.toLowerCase();

	// Find the parent task item element based on the id
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

	// Move the tasks between columns
	if (statusValue === "to do"){
		tasksToDoEl.appendChild(taskSelected);
	}
	else if (statusValue === "in progress") {
		tasksInProgressEl.appendChild(taskSelected);
	}
	else if (statusValue === "completed") {
		tasksCompletedEl.appendChild(taskSelected);
	}
};

// Submitting the form on the first try or an edit
formEl.addEventListener("submit", taskFormHandler);

// Clicking on an edit or on a delete button
pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
