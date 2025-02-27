//Récupération de l'input, du bouton, et de l'ul

const input = document.querySelector("input");
const button = document.querySelector("#addTaskBtn");
const list = document.querySelector("ul");
const saveBtn = document.querySelector("#save-btn");
const main = document.querySelector("main");

function handleModifyBtn(btn, taskContainer = null) {
  btn.addEventListener("click", (e) => {
    modify(
      btn,
      taskContainer != null ? taskContainer : e.target.closest("div")
    );
  });
}
function handleDeleteBtn(btn) {
  btn.addEventListener("click", (e) => {
    e.target.closest("div").remove();
  });
}

if (localStorage.getItem("todoList")) {
  list.innerHTML = localStorage.getItem("todoList");
  const savedDeleteBtn = list.querySelectorAll(".delete-btn");
  const savedModifyBtn = list.querySelectorAll(".modify-btn");
  savedDeleteBtn.forEach((btn) => {
    handleDeleteBtn(btn);
  });
  savedModifyBtn.forEach((btn) => {
    handleModifyBtn(btn);
  });
}

//sauvegarder
saveBtn.addEventListener("click", () => {
  localStorage.setItem("todoList", list.innerHTML);
  if (localStorage.getItem("todoList")) {
    const saved = document.createElement("h2");
    saved.innerHTML = "La liste a bien été sauvegardée";
    main.appendChild(saved);
  }
});

//recuperer le button
//changer le text par un input
//remove les btn delete et modify en btn valider
//au click sur le btn valider changer l'input par un text

function modify(modifyBtn, taskContainer) {
  //   modifyBtn.forEach((btn) => {

  modifyBtn.addEventListener("click", (e) => {
    const task = e.target.parentElement.querySelector("li");
    const deleteBtn = e.target.parentElement.querySelector(".delete-btn");
    const modifyInput = document.createElement("input");
    const validateBtn = document.createElement("i");
    validateBtn.classList.add("fa-solid", "fa-check", "validate-btn");
    modifyInput.classList.add("modify-input");
    modifyInput.setAttribute("type", "text");
    modifyInput.value = task.innerHTML;
    task.replaceWith(modifyInput);
    modifyBtn.remove();
    deleteBtn.replaceWith(validateBtn);
    // const newValue = modifyInput.value;
    validateBtn.addEventListener("click", () => {
      if (modifyInput.value === "") {
        return;
      }
      validateBtn.remove();
      const newTask = document.createElement("li");
      newTask.innerHTML = modifyInput.value;
      modifyInput.replaceWith(newTask);
      const newDeleteBtn = document.createElement("i");
      newDeleteBtn.classList.add("fa-solid", "fa-trash", "delete-btn");
      const newModifyBtn = document.createElement("i");
      newModifyBtn.classList.add("fa-solid", "fa-pen", "modify-btn");
      taskContainer.appendChild(newDeleteBtn);
      taskContainer.appendChild(newModifyBtn);

      //rajout des ecouteurs d'evenements sur les nouveaux boutons
      handleDeleteBtn(newDeleteBtn);

      handleModifyBtn(newModifyBtn, taskContainer);
    });
  });

  // });
}

//function qui ajoute une tache à la todo list au click du bouton

button.addEventListener("click", () => {
  if (input.value === "") {
    return;
  }

  const taskContainer = document.createElement("div");
  taskContainer.innerHTML = `
    <li>${input.value}</li> 
   <i class="fa-solid fa-trash delete-btn"></i>
   <i class="fa-solid fa-pen modify-btn"></i>
    `;
  taskContainer.classList.add("task-container");
  list.prepend(taskContainer);
  input.value = "";

  const deleteBtn = taskContainer.querySelector(".delete-btn");
  const modifyBtn = taskContainer.querySelector(".modify-btn");

  handleDeleteBtn(deleteBtn);

  handleModifyBtn(modifyBtn, taskContainer);
});

//function qui barre les taches au click de la tache
list.addEventListener("click", (e) => {
  const toCheck = document.querySelectorAll("li");
  toCheck.forEach((task) => {
    if (task == e.target) {
      task.classList.toggle("checked");
    }
    if (task.classList.contains("checked")) {
      list.appendChild(task.closest("div"));
    }
  });
});
