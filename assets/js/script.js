
// Get information from the DOM
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){

	// Prevents the browser from reloading
	event.preventDefault();

	// Create the next li element in the DOM
	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";
	listItemEl.textContent = "This is a new task.";
	tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
