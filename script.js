let tasks = [];

function addTask(){

  let input = document.getElementById("taskInput");

  let text = input.value.trim();

  if(text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    done: false
  });

  input.value = "";

  render();
}

function toggleTask(id){

  let task = tasks.find(t => t.id === id);

  task.done = !task.done;

  render();
}

function deleteTask(id){

  tasks = tasks.filter(t => t.id !== id);

  render();
}

function render(){

  let list = document.getElementById("list");

  list.innerHTML = "";

  if(tasks.length === 0){

    list.innerHTML = `
      <div class="empty">
        ✨ No tasks yet
      </div>
    `;
  }

  tasks.forEach(t => {

    let li = document.createElement("li");

    li.className = t.done ? "done" : "pending";

    li.innerHTML = `

      <div class="task-left">

        <label class="switch">
          <input 
            type="checkbox"
            ${t.done ? "checked" : ""}
            onchange="toggleTask(${t.id})"
          >
          <span class="slider"></span>
        </label>

        <span class="task-text">
          ${t.text}
        </span>

      </div>

      <button class="delete" onclick="deleteTask(${t.id})">
        <i class="fa-solid fa-trash"></i>
      </button>

    `;

    list.appendChild(li);

  });

  updateStats();
}

function updateStats(){

  let total = tasks.length;

  let completed = tasks.filter(t => t.done).length;

  let pending = total - completed;

  document.getElementById("total").textContent = total;
  document.getElementById("completed").textContent = completed;
  document.getElementById("pending").textContent = pending;
}

document
.getElementById("taskInput")
.addEventListener("keydown", function(e){

  if(e.key === "Enter"){
    addTask();
  }

});

render();