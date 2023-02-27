// variable assignment
var APIKey = "3df0bcb8b0d172f76856bbe7f2aa97bb";
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${APIKey}`;
var requestForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=imperial&appid=${APIKey}`;
var searchBtn = document.querySelector('#button');
var cityInput = document.querySelector('#input');
var currentCast = document.querySelector('#currentCast')
var currentDay = document.querySelector('.currentDay')
var weatherIcon = document.querySelector('#icon');
var currentTemp = document.querySelector('#currentTemp');
var currentWind = document.querySelector('#currentWind');
var currentHumidity = document.querySelector('#currentHumidity');
var weekTemp = document.querySelector('#weekTemp');
var weekWind = document.querySelector('#weekWind');
var weekHumidity = document.querySelector('#weekHumidity');

// event listener for search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
// fetch request for today's cast
    var city = cityInput.value;
    fetch(requestUrl + city)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
// grab data from api
        currentCast.textContent = data.name;
        currentTemp.textContent = `Temp: ${data.main.temp}°F`;
        currentWind.textContent = `Wind: ${data.wind.speed} MPH`;
        currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
        weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    })
// display error if no data found 
    .catch((error) => { 
        console.log(error);
        alert('Could not retrieve weather data');
    });
});

// fetch request for weekly cast
/* var city = cityInput.value;
fetch(requestForecast + city)
.then((response) => response.json())
.then((data) => { 
    console.log(data);
    
    // Display forecast data 
    forecastData.forEach(item => {
        var date = new Date(item.dt_txt);
        var weekDay = date.toLocaleDateString('en-US', {weekday: 'long' });
        var weekTemp = Math.round((item.main.temp - 273.15) * (9/5) + 32);
        var weekWind = item.weather[0].description;
        var weekHumidity = item.weather[0].description;
        console.log(`${weekDay}: ${weekTemp}°F, ${weekWind}MPH, ${weekHumidity}%`);
    }) */
  /*   weatherIcon.src =  `http://openweathermap.org/img/w/${data.weather[i].icon}.png`
    weekTemp.textContent =  `Temp: ${data.main.temp[i] * (9/5) + 32}°F`;
    weekWind.textContent = `Wind: ${data.wind.speed[i]} MPH`;
    weekHumidity.textContent = `Humidity: ${data.weather[i]}%` */

// display error if no data found
/*     .catch((error) => {
        console.log(error);
        alert('Could not retrieve weather data');
    });
});
 */
// populates cards with forecast info



// displays current day 
var currentDate = dayjs();
$('.currentDay').text(currentDate.format('MMMM D, YYYY'))

// saves previous searches to local storage
