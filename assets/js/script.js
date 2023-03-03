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
var historyContainer = document.getElementById('historyContainer');

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
        weatherIcon.src = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>`;
        currentTemp.textContent = `Temp: ${data.main.temp} °F`;
        currentWind.textContent = `Wind: ${data.wind.speed} MPH`;
        currentHumidity.textContent = `Humidity: ${data.main.humidity} %`;
    })
    var city = cityInput.value;
    var requestForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
    fetch(requestForecast)
    .then((response) => response.json())
    .then((data) => { 
        console.log(data);

        // extract data from api
        $('#forecast').html('');
        for(var i = 0; i < 5; i++) {
            var forecast = {
                day: data.list[i].dt,
                icon: data.list[i].weather[0].icon,
                weekTemp: data.list[i].main.temp,
                weekWind: data.list[i].wind.speed,
                weekHumidity: data.list[i].main.humidity,
                
            }
// date for each card
// how to offset for each day rather than 3-hour intervals
var forecastDay = i * 8 + 4;
var weekDay = new Date(data.list[forecastDay].dt * 1000); 
console.log(weekDay.toLocaleDateString("en-US"));
var newDate = dayjs(weekDay).format("MM/DD");

var iconUrl = `<img src="https://openweathermap.org/img/wn/${forecast.icon}.png"/>`;

// append elements to table rows
var weekCast = $(`
    <div class="container card five-card-body bg-primary text-white">
        <div class="row offset-md-1">
            <div class="col-md-2 offset-md-1 text-center fs-3">${newDate}</div>
            <div class="col-md-2">${iconUrl}</div>
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

// saves city to local storage
function storeCity (city) {
    if (searchHistory.includes(city)) {
        return;
    } else {
        searchHistory.push(city);
        localStorage.setItem("cities", JSON.stringify(searchHistory));
    }
}

// retrieves data from local storage
function retrieveLocalStorage() {
/* 	var searchHistory = localStorage.getItem("cities");
	if (searchHistory !== null) {
		newList = JSON.parse(searchHistory);
		return newList;
	} else {
		newList = [];
	}
	return newList; */
}

// displays users previous searches
function displaySearchHistory() {
/*     $(".list-group-item").remove();
    searchHistory = retrieveLocalStorage();

    if(searchHistory !== null) {
        for (var i = 0; i < searchHistory.length; i++) {
            cityName = searchHistory[i];
			var displaySearchHistory = $(
				`<li id="${cityName}"<a href="#" class="list-group-item list-group-item-action list-group-item-primary">${cityName}</li>`
			);
			$("#historyContainer").append(displaySearchHistory);
        }
    } */
}