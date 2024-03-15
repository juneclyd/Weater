"use strict"

const btnLocation = document.querySelector(".buttonCurrentLocation");
const dataForWeatherForecast = {};
const listApi = {};
console.log(listApi);
async function getCountry(country) {
  const getDataCoord = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=d2c713cd98c6e425dc37bcbe8bf7da74`);
  const dataCoord = await getDataCoord.json();
  listApi.dataCoord =  dataCoord;
  console.log(dataCoord);
  if(Object.keys(dataCoord).length !== 0){
    if(dataCoord[0].name === country){
      document.querySelector(".TwoBlogForecast").style.display = "flex";
      document.querySelector(".OneBlogForecast").style.display = "flex";
      const getDataTime = await fetch(`http://worldtimeapi.org/api/timezone/Europe/${country}`);      
      const dataTime = await getDataTime.json();
      listApi.dataTime = dataTime;
      console.log(dataTime);
      const getDataWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${dataCoord[0].lat}&lon=${dataCoord[0].lon}&appid=d2c713cd98c6e425dc37bcbe8bf7da74`); 
      const dataWeather = await getDataWeather.json();
      listApi.dataWeather = dataWeather;
      console.log(dataWeather);
      collectingWeatherData(listApi);
    } else{
      return 0;
    }
  } else {
    document.getElementById('idInputText').style.background = "#742323";
    return 0;
  }
}
getCountry("Moscow");

function collectingWeatherData(listApi){
  dataForWeatherForecast.city = listApi.dataCoord[0].name;
  dataForWeatherForecast.temp = Math.round(Number(listApi.dataWeather.main.temp) - 273);
  dataForWeatherForecast.feelsLike = Math.round(Number(listApi.dataWeather.main.feels_like) - 273);
  dataForWeatherForecast.weatherWindows = listApi.dataWeather.weather[0].main;
  dataForWeatherForecast.pressure = listApi.dataWeather.main.pressure;
  dataForWeatherForecast.humidity = listApi.dataWeather.main.humidity;
  dataForWeatherForecast.speed = Math.round(listApi.dataWeather.wind.speed);
  dataForWeatherForecast.sunrise = new Date(listApi.dataWeather.sys.sunrise * 1000).toISOString().slice(-13, -8);
  dataForWeatherForecast.sunset = new Date(listApi.dataWeather.sys.sunset * 1000).toISOString().slice(-13, -8);
  dataForWeatherForecast.todayDayArr = listApi.dataTime.datetime.slice(0, 10).split('-').reverse();
  dataForWeatherForecast.todayHours = Number(listApi.dataTime.datetime.slice(11, 13).split('-').reverse());
  dataForWeatherForecast.todayMinutes = Number(listApi.dataTime.datetime.slice(14, 16).split('-').reverse());
  updateTime(dataForWeatherForecast);
  updateWindow(dataForWeatherForecast);
}

function updateWindow(dataForWeatherForecast){
  document.querySelector(".mainTemperature").innerHTML = `${dataForWeatherForecast.temp}℃`;
  document.querySelector(".feelsLikeSpan").innerHTML = `${dataForWeatherForecast.feelsLike}℃`;
  document.querySelector(".weatherWindows").innerHTML = `${dataForWeatherForecast.weatherWindows}`;
  document.querySelector(".HumidityData").innerHTML = `${dataForWeatherForecast.humidity}%`;
  document.querySelector(".PressureData").innerHTML = `${dataForWeatherForecast.pressure}hPa`;
  document.querySelector(".WindSpeedData").innerHTML = `${dataForWeatherForecast.speed}km/h`;
  document.querySelector(".city").innerHTML = `${dataForWeatherForecast.city}`;
  document.querySelector(".sunriseTime").innerHTML = `${dataForWeatherForecast.sunrise} AM`;
  document.querySelector(".sunsetTime").innerHTML = `${dataForWeatherForecast.sunset} AM`;
  document.querySelector(".date").innerHTML = `${dataForWeatherForecast.todayDayArr[0]}.${dataForWeatherForecast.todayDayArr[1]}.${dataForWeatherForecast.todayDayArr[2]}`;
  document.querySelector(".time").innerHTML = `${dataForWeatherForecast.todayHours}:${dataForWeatherForecast.todayMinutes}`
  console.log(dataForWeatherForecast);
}
function updateTime(dataForWeatherForecast){
  setInterval(() => {
    if(dataForWeatherForecast.todayHours === 23 && dataForWeatherForecast.todayMinutes === 59){
      document.querySelector('.time').textContent = `${dataForWeatherForecast.todayHours = 0}:0${dataForWeatherForecast.todayMinutes = 0}`;
    } else if(dataForWeatherForecast.todayMinutes === 59){
      if(dataForWeatherForecast.todayHours < 10) {
        document.querySelector('.time').textContent = `${dataForWeatherForecast.todayHours = dataForWeatherForecast.todayHours + 1}:${dataForWeatherForecast.todayMinutes = 0}`;
      } else {
        document.querySelector('.time').textContent = `${dataForWeatherForecast.todayHours = dataForWeatherForecast.todayHours + 1}:${dataForWeatherForecast.todayMinutes = 0}`;
      }
    } else if(dataForWeatherForecast.todayMinutes < 10) {
      document.querySelector('.time').textContent = `${dataForWeatherForecast.todayHours}:0${dataForWeatherForecast.todayMinutes = dataForWeatherForecast.todayMinutes + 1}`;
    } else {
      document.querySelector('.time').textContent = `${dataForWeatherForecast.todayHours}:${dataForWeatherForecast.todayMinutes = dataForWeatherForecast.todayMinutes + 1}`;
    }
  }, 60000)
}


btnLocation.addEventListener('click', function(e) {
  e.preventDefault();
  if(document.getElementById('idInputText').value !== "") {
    document.getElementById('idInputText').style.background = "#444";
    window.addEventListener('load', getCountry(document.getElementById('idInputText').value));
    document.querySelector(".TwoBlogForecast").style.display = "flex";
    document.querySelector(".OneBlogForecast").style.display = "flex";
    document.getElementById('idInputText').value = "";
  }
  else{
    document.getElementById('idInputText').style.background = "#742323";
  }
})
document.getElementById('idInputText').addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.querySelector(".TwoBlogForecast").style.display = "flex";
    document.querySelector(".OneBlogForecast").style.display = "flex";
    if(document.getElementById('idInputText').value !== "") {
      document.getElementById('idInputText').style.background = "#444";
      window.addEventListener('load', getCountry(document.getElementById('idInputText').value))
      document.getElementById('idInputText').value = "";
    }
    else{
      document.getElementById('idInputText').style.background = "#742323";
    }
  }
});

