const body = document.querySelector('body')

const IMG_NUM = 9

function paintImage(imgNum){
  const image = new Image() 
  image.src = `./img${imgNum+1}.png`
  image.classList.add("bgImage")
  body.appendChild(image)
}

function genRandom(){
  const number = Math.random()*IMG_NUM
  return Math.floor(number)
}

function init(){
  const randomNumber = genRandom()
  paintImage(randomNumber)
}

init()