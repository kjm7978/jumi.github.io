
const toDoForm = document.querySelector(".js-toDoForm");
const input = toDoForm.querySelector("input");
const pending = document.querySelector(".js-pending");
const finished = document.querySelector(".js-finished");
console.log(toDoForm)

let pendingLists = [];
let finishedLists = [];
const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

function savePending(obj) {
  localStorage.setItem(PENDING_LS, JSON.stringify(obj));
}
function saveFinished(obj) {
  console.log("save");
  localStorage.setItem(FINISHED_LS, JSON.stringify(obj));
}

function painting(text, id, isPending = true) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btnCancel = document.createElement("button");
  const btnUpdate = document.createElement("button");

  span.innerText = text;
  btnCancel.innerHTML = "❌";
  btnCancel.addEventListener(
    "click",
    isPending ? cancelPendingHandler : cancelFinishHandler
  );
  btnUpdate.innerHTML = isPending ? "⭕️" : "⏪";
  btnUpdate.addEventListener(
    "click",
    isPending ? updateToFinishHandler : updateToPendingHandler
  );

  li.id = id;
  li.appendChild(btnCancel);
  li.appendChild(btnUpdate);
  li.appendChild(span);

  isPending ? pending.appendChild(li) : finished.appendChild(li);
  isPending ? savePending(pendingLists) : saveFinished(finishedLists);
}

function paintingPending(text) {
  const pendingObj = {
    id: pendingLists.length + 1,
    text: text
  };
  pendingLists.push(pendingObj);
  painting(text, pendingObj.id, true);
}
function paintingFinishing(text) {
  const finishingObj = {
    id: finishedLists.length + 1,
    text: text
  };
  finishedLists.push(finishingObj);
  painting(text, finishingObj.id, false);
}

function cancelPendingHandler(event) {
  const li = event.target.parentNode;
  const cleanedLists = pendingLists.filter(
    (cleanList) => cleanList.id !== Number(li.id)
  );
  pending.removeChild(li);
  pendingLists = cleanedLists;
  savePending(pendingLists);
}
function cancelFinishHandler(event) {
  const li = event.target.parentNode;
  const cleanedLists = finishedLists.filter(
    (cleanList) => cleanList.id !== Number(li.id)
  );
  finished.removeChild(li);
  finishedLists = cleanedLists;
  saveFinished(finishedLists);
}

function updateToFinishHandler(event) {
  const li = event.target.parentNode;
  const span = li.querySelector("span");
  const cleanedLists = pendingLists.filter(
    (cleanList) => cleanList.id !== Number(li.id)
  );
  //const updatedList = pendingLists.filter((cleanList)=> cleanList.id === Number(li.id))

  pending.removeChild(li);
  pendingLists = cleanedLists;
  savePending(pendingLists);
  paintingFinishing(span.innerHTML);
}

function updateToPendingHandler(event) {
  const li = event.target.parentNode;
  const span = li.querySelector("span");
  const cleanedLists = finishedLists.filter(
    (cleanList) => cleanList.id !== Number(li.id)
  );

  finished.removeChild(li);
  finishedLists = cleanedLists;
  savePending(finishedLists);
  paintingPending(span.innerText);
}

function enterHandler(event) {
  if (event.key === "Enter") {
    const text = input.value;
    paintingPending(text);

    input.value = "";
  }
}
input.addEventListener("keydown", enterHandler);

function init() {
  const pendingLocal = localStorage.getItem(PENDING_LS);
  const jsonPendingLocal = JSON.parse(pendingLocal);

  const finishingLocal = localStorage.getItem(FINISHED_LS);
  const jsonFinishingLocal = JSON.parse(finishingLocal);

  if (jsonPendingLocal !== null) {
    jsonPendingLocal.forEach((item) => paintingPending(item.text));
  }
  if (jsonFinishingLocal !== null) {
    jsonFinishingLocal.forEach((item) => paintingFinishing(item.text));
  }
}

init();
