/**
 * script.js
 * ----------
 * Core logic for Interactive To-Do List.
 * Handles task creation, selection, marking done, deletion, priority, and About section.
 * Toolbar provides "Select All", "Mark Done", and "Delete" actions.
 */

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");

  // Add tasks by pressing the Enter key
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
});


// Add new task
function addTask() {
  const input = document.getElementById("input");
  const newTask = input.value.trim();
  if (newTask === "") return;

  const li = document.createElement("li");

  li.innerHTML = `
   <div class="task-left">
    <input type="checkbox" class="task-checkbox" />
      <span class="priority-marker"></span>
      <span class="task-text">${newTask}</span>
    </div>
    <span class="task-delete" onclick="removeTask(this)">×</span>
  `;

  // Checkbox logic
  const checkbox = li.querySelector(".task-checkbox");
  checkbox.addEventListener("change", (e) => {
    e.stopPropagation();                         // prevent li selection
    li.classList.toggle("done", checkbox.checked); // add/remove done class
    updateSelectAllState();                      // keep select-all in sync
  });
  
  // Distinguish between single and double click
  let clickTimer = null;

  // Single click --> toggle selection
  li.addEventListener("click", (event) => {
    if 
    (
      !event.target.classList.contains("task-checkbox") &&
      !event.target.classList.contains("task-delete")
    ) {
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
      li.classList.toggle("selected");

      // update Select All checkbox visual state
      const all = document.querySelectorAll("#tasks li");
      const selected = document.querySelectorAll("#tasks li.selected");
      document.getElementById("selectAll").checked = all.length > 0 && selected.length === all.length;
        }, 250);
    }
  });

  // Double-click --> toggle priority (except checkbox/delete) 
  li.addEventListener("dblclick", (event) => {
    if 
    (
      !event.target.classList.contains("task-checkbox") &&
      !event.target.classList.contains("task-delete")
    ) {
      clearTimeout(clickTimer); // cancel single click
      li.classList.toggle("priority");
    }
  });

  document.getElementById("tasks").appendChild(li);
  input.value = "";
}


// Remove single task
function removeTask(xButton) {
  const li = xButton.closest("li");
  li.remove();
  updateSelectAllState();
}

// Toolbar: Select All (visual selection only)
const selectAll = document.getElementById("selectAll");
selectAll.addEventListener("change", () => {
  const tasks = document.querySelectorAll("#tasks li");
  tasks.forEach(li => li.classList.toggle("selected", selectAll.checked));
});


// Toolbar: Mark Done
function markSelectedDone() {
  const selectedTasks = document.querySelectorAll("#tasks li.selected");
  
  if (selectedTasks.length === 0) return; // nothing selected

  // check if all selected tasks are already done
  const allDone = Array.from(selectedTasks).every(li => li.classList.contains("done"));

  selectedTasks.forEach(li => {
    const checkbox = li.querySelector(".task-checkbox");
    if (allDone) {
      // unmark done
      li.classList.remove("done");
      checkbox.checked = false;
    } else {
      // mark done
      li.classList.add("done");
      checkbox.checked = true;
    }
    li.classList.remove("selected"); // clear selection after action
  });

  document.getElementById("selectAll").checked = false;
}

// Toolbar: Delete Selected
function deleteSelected() {
  const selectedTasks = document.querySelectorAll("#tasks li.selected");
  selectedTasks.forEach(li => li.remove());
  document.getElementById("selectAll").checked = false;
}

// Sync selectAll visual state
function updateSelectAllState() {
  const all = document.querySelectorAll("#tasks .task-checkbox");
  const checked = document.querySelectorAll("#tasks .task-checkbox:checked");
  selectAll.checked = all.length > 0 && all.length === checked.length;
}

// Displays author information in the About section.
function doAbout() {
  const bio = document.getElementById("divAbout");

  if (!bio.innerHTML) {
    bio.innerHTML = "Author: M. Croffie";
    bio.className = "aboutColor";
  } else {
    bio.innerHTML = "";
  }
}
