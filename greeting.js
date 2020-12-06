const form = document.querySelector(".js-form")
const nameInput = form.querySelector("input")
const greeting = document.querySelector(".js-greetings")
console.log(form)

const LS_NAME = "currentUser"
const SHOWING_CN = "show"

function saveName(text){
    localStorage.setItem(LS_NAME,text)
}

function paintName(text){
    form.classList.remove(SHOWING_CN)
    greeting.classList.add(SHOWING_CN)
    greeting.innerText=`Hi, welcome ${text}`
}

function handleInputName(e){
    e.preventDefault()
    saveName(nameInput.value)
    paintName(nameInput.value)
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleInputName)
    console.log(form)
}

function init(){
    const localName = localStorage.getItem(LS_NAME)
    if(localName === null){
        askForName();
    }else{
        paintName(localName)
        console.log(`hi ${localName}`)
    }
}


function paintGreeting(text){
    console.log("/??")
    form.classList.remove(SHOWING_CN)
  
}

  init()