const COORDS = 'coords';
const API_KEY = "c5dbc0c9285bcfc97fa82d540cb1ce0e";
const weather = document.querySelector(".js-weather")

function getWeather(latitude,longitude){
 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`).then((response)=>response.json()).then(json=>{
    const temp = json.main.temp
    const location = json.name
    weather.innerHTML=` ✣ -- Today's temp : ${temp}℃ @${location} -- ✣ `
   })
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoords(coordsObj)
  getWeather(latitude,longitude)
}

function handleGeoError(){
    weather.innerHTML=`Can't find your location ⚠︎`
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }else{
    parsedCoords = JSON.parse(loadedCoords)
    getWeather(parsedCoords.latitude, parsedCoords.longitude)
  }
}

function init(){
  loadCoords()
}

init();