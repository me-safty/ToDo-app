let input = document.querySelector('[type="text"]');
let submit = document.querySelector('[type="submit"]');
let ac = document.querySelector('.ac');
let tasksDiv = document.querySelector('.tasks');

document.querySelector(".edit").onclick = _ => editPass();

function editPass() {
  document.querySelector(".edit").style.display = 'none';
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.className = 'editInput';
  document.querySelector(".edit").parentElement.appendChild(input);
  input.focus();
  input.onblur = _ => {
    if (input.value !== '') {
      localStorage.setItem("pass", input.value);
    } 
    input.remove();
    document.querySelector(".edit").style.display = 'block';
  }
}

window.onload = _ => popup();

function popup(name) {
  let div = document.createElement("div");
  div.classList.add("popup");
  let pu = document.createElement("p");
  pu.appendChild(document.createTextNode("user name:"));
  let pp = document.createElement("p");
  pp.appendChild(document.createTextNode("password:"));
  let inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  let inputPass = document.createElement("input");
  inputPass.setAttribute("type", "text");
  let btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Submit"));
  div.appendChild(pu);
  div.appendChild(inputName);
  div.appendChild(pp);
  div.appendChild(inputPass);
  div.appendChild(btn);
  document.body.appendChild(div);
  if (window.localStorage.theam) {
    let theam = JSON.parse(localStorage.theam);
    pp.style.color = theam.pColor;
    pu.style.color = theam.pColor;
  }
  if (localStorage.name) {
    inputName.value = localStorage.name
  }
  btn.onclick = _ => {
    if (localStorage.pass === undefined) {
      localStorage.setItem("pass", inputPass.value);
    }
    if (inputPass.value === localStorage.pass && inputName.value !== '') {
      localStorage.setItem("name", inputName.value);
      // localStorage.setItem("pass", inputPass.value);
      localStorage.name ? document.querySelector(".userName").innerHTML = `${localStorage.name}` : '';
      div.remove();
    } else if (inputPass.value !== localStorage.pass) {
      inputPass.value = 'Password Is Incorect';
      inputPass.style.color = 'red';
      inputPass.onfocus = _ => {
        inputPass.value = '';
        inputPass.style.color = localStorage["box-color"];
      }
    } 
  }
} 

let tasks = [];

if (window.localStorage.tasks && tasksDiv.innerHTML === '') {
  let arrOfTasks = JSON.parse(window.localStorage.tasks);
  for (let i = 0; i < arrOfTasks.length; i++) {
    let div = document.createElement("div");
    div.classList.add("task");
    div.id = `${arrOfTasks[i].id}`;
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(arrOfTasks[i].title));
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("Done"));
    btn.classList.add("done");
    div.appendChild(p);
    div.appendChild(btn);
    tasksDiv.appendChild(div);
    if (arrOfTasks[i].completed === true) {
      div.classList.add("active");
    }
    tasks.push(arrOfTasks[i]);
    countTasks();
  }
}


submit.onclick = _ => {
  if (input.value !== '') {
    addTasksToArray(input.value);
  }
  input.value = '';
  input.focus();
  countTasks();
}

function addTasksToArray(taskName) {
  let task = {
    id: `${Date.now()}`,
    title: taskName,
    completed: false,
  }
  tasks.push(task);
  addTaskToForm(task);
}

function addTaskToForm(task) {
  tasksDiv.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    let div = document.createElement("div");
    div.classList.add("task");
    div.id = `${tasks[i].id}`;
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(tasks[i].title));
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("Done"));
    btn.classList.add("done");
    div.appendChild(p);
    div.appendChild(btn);
    tasksDiv.appendChild(div);
    if (tasks[i].completed === true) {
      div.classList.add("active");
    }
  }
  addArrayToStorege(tasks);
}

document.addEventListener("click", e => {
  if (e.target.className === 'done') {
    e.target.parentElement.classList.toggle("active");
    for (let i = 0; i < tasks.length; i++) {
      if (e.target.parentElement.id == tasks[i].id) {
        tasks[i].completed === false ? tasks[i].completed = true : tasks[i].completed = false;
        addArrayToStorege(tasks);
      }
    }
  }
  countTasks();
})

ac.onclick = _ => {
  let doneTAsks = document.querySelectorAll(".active");
  doneTAsks.forEach(e => e.remove());
  tasks = tasks.filter(e => e.completed !== true);
  addArrayToStorege(tasks);
  countTasks();
}

function addArrayToStorege(tasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
};

function countTasks() {
  let num = document.querySelectorAll(".task").length;
  let numBox = document.querySelector(".all");
  numBox.innerHTML = num; 
}

if (localStorage["box-color"]) {
  document.documentElement.style.setProperty('--main-color', localStorage["box-color"]);
  document.documentElement.style.setProperty('--border', `0.1px solid ${localStorage["box-color"]}`);
}
let colors = document.querySelectorAll(".fonts .box div");
colors.forEach(e => {
  e.onclick = _ => {
    let color = e.dataset.color;
    document.documentElement.style.setProperty('--main-color', color);
    document.documentElement.style.setProperty('--border', `0.1px solid ${color}`);
    localStorage.setItem("box-color" , color);
  }
});

if (localStorage.theam) {
  addStyles();
}

let theams = document.querySelectorAll(".theam .box div");
function addTheamsToS() {
  const blackTheam = {
    sahdow: "0px 0px 11px 3px #00000059",
    ["box-color"]: "#222831",
    ["task-color"]: "#393E46",
    // border: "0.1px solid #ffffff6e",
    border1: "none",
    pColor: "#fff",
  }
  const whiteTheam = {
    sahdow: "0px 0px 3px 3px #7e7e7e2e",
    ["box-color"]: "#fff",
    ["task-color"]: "#a4a4a4",
    // border: "0.1px solid #7f7f7f",
    border1: "var(--border)",
    pColor: "#5d5d5d",
  }
  theams.forEach(e => {
    e.onclick = _ => {
      if (e.dataset.color === "white") {
        localStorage.setItem("theam", JSON.stringify(whiteTheam));
      } else {
        localStorage.setItem("theam", JSON.stringify(blackTheam));
      }
      addStyles();
    } 
  });
}
addTheamsToS();
function addStyles() {
  let theam = JSON.parse(localStorage.theam);
  document.documentElement.style.setProperty('--sahdow', theam.sahdow);
  document.documentElement.style.setProperty('--box-color', theam["box-color"]);
  document.documentElement.style.setProperty('--task-color', theam["task-color"]);
  // document.documentElement.style.setProperty('--border', theam.border);
  document.querySelector('.counter .all').style.border = theam.border1;
  document.querySelector('.name').style.color = theam.pColor;
  document.querySelector('.pass p').style.color = theam.pColor;
  document.querySelectorAll(".color p").forEach(e => {
    e.style.color = theam.pColor;
  })
  document.querySelectorAll(".popup p").forEach(e => {
    e.style.color = theam.pColor;
  })
  document.querySelectorAll('[type="text"]').forEach(e => {
    e.style.border = theam.border1;
  })
}
