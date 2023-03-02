// variable assignment
var APIKey = "3df0bcb8b0d172f76856bbe7f2aa97bb";
var searchBtn = document.querySelector('#button');
var cityInput = document.querySelector('#input');
var currentCast = document.querySelector('#currentCast')
var currentDay = document.querySelector('.currentDay')
var weatherIcon = document.querySelector('#dayIcon');
var currentTemp = document.querySelector('#currentTemp');
var currentWind = document.querySelector('#currentWind');
var currentHumidity = document.querySelector('#currentHumidity');
var weekCast = document.querySelector('#weekCast');
var weekForecast = document.querySelector('#forecast')
var weekTemp = document.querySelector('#weekTemp');
var weekWind = document.querySelector('#weekWind');
var weekHumidity = document.querySelector('#weekHumidity');

// event listener for search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
// fetch request for today's cast
    var city = cityInput.value;
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
// grab data from api
        currentCast.textContent = data.name;
        currentTemp.textContent = `Temp: ${data.main.temp}°F`;
        currentWind.textContent = `Wind: ${data.wind.speed} MPH`;
        currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
        weatherIcon.src = data.weather[0].icon;
    })
    var city = cityInput.value;
    var requestForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}&cnt=5`;
    fetch(requestForecast)
    .then((response) => response.json())
    .then((data) => { 
        console.log(data);
        // extract data from api
        $('#forecast').html('');
        for(var i = 0; i < 5; i++) {
            var forecast = {
                icon: data.list[i].weather[0].icon,
                weekTemp: data.list[i].main.temp,
                weekWind: data.list[i].wind.speed,
                weekHumidity: data.list[i].main.humidity,
            }

// date for each card
var weekDay = new Date(data.list[i].dt * 1000);  
var newDate = dayjs(weekDay).format("MMMM D, YYYY");
var icon = `<img src="https://openweathermap.org/img/wn/${forecast.icon}.png"/>`;

// append elements to table rows
var weekCast = $(`
    <div class="container card five-card-body bg-primary text-white">
        <div class="row">
            <div class="col-md-2 fs-3">${newDate}</div>
            <div class="col-md-2">${forecast.icon}</div>
            <div class="col-md-2 fs-5">Temp: ${forecast.weekTemp}°F</div>
            <div class="col-md-2 fs-5">Wind: ${forecast.weekWind}MPH</div>
            <div class="col-md-2 fs-5">Humidity: ${forecast.weekHumidity}%</div>
        </div>
    </div>
`);

//append cards to html
$('#forecast').append(weekCast);
        }
    });
});
// displays current day 
var currentDate = dayjs();
$('.currentDay').text(currentDate.format('MMMM D, YYYY'))

// saves previous searches to local storage