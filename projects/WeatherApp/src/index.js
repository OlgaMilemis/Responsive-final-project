let currentTime = new Date();
function formatDate(date) {
  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[weekDays];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function formatNextDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (days = days[day]);
}

function showForecast(response) {
  let nextDaysForecast = response.data.daily;
  let forecastElement = document.querySelector("#nextDaysForecast");

  let nextDaysForecastHTML = `<div class="row">`;
  nextDaysForecast.forEach(function (forecastDay, index) {
    if (index !== 0 && index < 7) {
      nextDaysForecastHTML =
        nextDaysForecastHTML +
        ` <div class="col-2 eachDay">
              <div class="forecastDay">${formatNextDays(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="42"/>
              <div class="forecastTemp">
                <span class="forecastTempMax">${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="forecastTempMin">${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
         </div>`;
    }
  });

  nextDaysForecastHTML = nextDaysForecastHTML + `</div>`;
  forecastElement.innerHTML = nextDaysForecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5eac19cf21f53d5d30820a9a9bafd9f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#currentCity");
  let dateDisplay = document.querySelector("#date");
  let temperatureElement = document.querySelector("#actualTemp");
  let minTempElement = document.querySelector("#minTemp");
  let maxTempElement = document.querySelector("#maxTemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  dateDisplay.innerHTML = formatDate(currentTime);
  temp = response.data.main.temp;
  tempMin = response.data.main.temp_min;
  tempMax = response.data.main.temp_max;
  temperatureElement.innerHTML = Math.round(temp);
  minTempElement.innerHTML = Math.round(tempMin);
  maxTempElement.innerHTML = Math.round(tempMax);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "5eac19cf21f53d5d30820a9a9bafd9f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showPosition(position) {
  let apiKey = "5eac19cf21f53d5d30820a9a9bafd9f0";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let dateDisplay = document.querySelector("#date");
dateDisplay.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

let buttonCurrentCoords = document.querySelector("#current-location-button");
buttonCurrentCoords.addEventListener("click", getCurrentCoords);

search("Moscow");
