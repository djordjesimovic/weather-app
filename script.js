let city = document.querySelector('.input');
let getInfoBtn = document.querySelector('.get-info');
const apiKey = "4d8fb5b93d4af21d66a2948710284366";

getInfoBtn.addEventListener('click', () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`)
    .then(response => {
        if(response.status < 200 || response.status >= 300){
            throw new Error(response.status + 'error');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let today = new Date();
        let date = (today.getMonth()+1) + '/' + today.getDate() + '/'+ today.getFullYear();

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const d = new Date();
        let day = d.getDay();
        console.log(days[day] + ', ' + date);

        let timezone = data.timezone;
        let sunriseData = data.sys.sunrise;
        let sunsetData = data.sys.sunset;

        let sunrise = moment.utc(sunriseData,'X').add(timezone,'seconds').format('HH:mm a');
        let sunset = moment.utc(sunsetData,'X').add(timezone,'seconds').format('HH:mm a');


        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg`;

        document.querySelector('.container').innerHTML = `
        <div class="card">
            <div class="main-info">
                <h2 class="city">${data.name}<sup class="country">${data.sys.country}</sup></h2>
                <h3 class="date">${days[day]}, ${date}</h3>
                <span class="temperature-label">Temperature</span>
                <div class="cel-far-btns">
                    <button class="celsius btn">°C</button>
                    <button class="fahrenheit btn">°F</button>
                </div>
                <h3 class="temperature">${data.main.temp.toFixed(0) || 'No info'}°C</h3>

                <div class="image-wrapper">
                    <img src="${icon}" class="icon">
                    <span class="description">${data.weather[0].main || 'No info'}</span>
                </div>

                <p class="feels-like">Feels like: <span class="feels-like-value"> ${data.main.feels_like.toFixed(1)}°C</span></p>


            </div>

            <div class="aditional-info">
                <div class="row">
                    <div class="wind-wrapper wrapper">
                        <span class="wind-label">Wind</span>
                        <h3 class="wind">${data.wind.speed || 'No info'}km/h</h3>
                    </div>
                    <div class="pressure-wrapper wrapper">
                        <span class="pressure-label wind-label">Pressure</span>
                        <h3 class="wind">${data.main.pressure || 'No info'}mbar</h3>
                    </div>
                </div>

                <div class="row">
                    <div class="min-temp-wrapper wrapper">
                        <span class="wind-label">Min temperature</span>
                        <h3 class="wind min-temp">${data.main.temp_min.toFixed(1) || 'No info'}°C</h3>
                    </div>
                    <div class="max-temp-wrapper wrapper">
                        <span class="pressure-label wind-label">Max temperature</span>
                        <h3 class="wind max-temp">${data.main.temp_max.toFixed(1) || 'No info'}°C</h3>
                    </div>
                </div>

                <div class="row">
                    <div class="sunrise-wrapper wrapper">
                        <span class="wind-label">Sunrise</span>
                        <h3 class="wind">${sunrise || 'No info'}</h3>
                    </div>
                    <div class="sunset-wrapper wrapper">
                        <span class="pressure-label wind-label">Sunset</span>
                        <h3 class="wind">${sunset || 'No info'}</h3>
                    </div>
                </div>
                
                
            </div>
    

        </div>`;
        document.querySelector('.error-msg').textContent = '';


        document.querySelector('.fahrenheit').addEventListener('click', () => {
            document.querySelector('.temperature').textContent = (data.main.temp * 1.8 + 32).toFixed(0) + '°F';
            document.querySelector('.feels-like-value').textContent = (data.main.feels_like * 1.8 + 32).toFixed(1) + '°F';
            document.querySelector('.min-temp').textContent = (data.main.temp_min * 1.8 + 32).toFixed(1) + '°F';
            document.querySelector('.max-temp').textContent = (data.main.temp_max * 1.8 + 32).toFixed(1) + '°F';
        })
        document.querySelector('.celsius').addEventListener('click', () => {
            document.querySelector('.temperature').textContent = data.main.temp.toFixed(0) + '°C';
            document.querySelector('.feels-like-value').textContent = data.main.feels_like.toFixed(1) + '°C';
            document.querySelector('.min-temp').textContent = data.main.temp_min.toFixed(1) + '°C';
            document.querySelector('.max-temp').textContent = data.main.temp_max.toFixed(1) + '°C';
        });
    })
    .catch(error => {
        console.log(error);
        document.querySelector('.error-msg').textContent = 'Wrong input!'
    });
});

