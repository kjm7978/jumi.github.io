const clock = document.querySelector('.js-clock')
const clockTitle = clock.querySelector('h1')

function getTime(){
  const date = new Date()
  const minutes = date.getMinutes()
  const hours = date.getHours()
  const seconds = date.getSeconds()
  clockTitle.innerHTML = `${hours>9? hours:`0${hours}`}:${minutes>9?minutes:`0${minutes}`}:${seconds>9? seconds : `0${seconds}`}`

}
function init(){
  getTime()
  setInterval(getTime,1000)
}

init();