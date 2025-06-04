// ShoreSquad App JS

// Google Maps: Display Singapore
function initMap() {
  const singapore = { lat: 1.3521, lng: 103.8198 };
  const map = new google.maps.Map(document.getElementById('google-map'), {
    center: singapore,
    zoom: 12,
    disableDefaultUI: false,
  });

  // Add markers for popular beach cleanup spots
  const beaches = [
    {
      name: 'East Coast Park',
      position: { lat: 1.3039, lng: 103.9120 },
      info: 'Popular for large-scale cleanups and events.'
    },
    {
      name: 'Changi Beach',
      position: { lat: 1.3906, lng: 103.9876 },
      info: 'Known for family-friendly cleanups.'
    },
    {
      name: 'Pasir Ris Beach',
      position: { lat: 1.3822, lng: 103.9515 },
      info: 'Frequented by youth volunteer groups.'
    },
    {
      name: 'Sembawang Beach',
      position: { lat: 1.4597, lng: 103.8402 },
      info: 'Quiet spot, often cleaned by local communities.'
    },
    {
      name: 'Labrador Nature Reserve',
      position: { lat: 1.2702, lng: 103.8021 },
      info: 'Nature lovers gather here for eco-action.'
    }
  ];

  beaches.forEach(beach => {
    const marker = new google.maps.Marker({
      position: beach.position,
      map: map,
      title: beach.name
    });
    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${beach.name}</strong><br>${beach.info}`
    });
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
}

function getWeatherAnim(condition) {
  // Return animated SVG or static PNG for main weather types
  switch (condition.toLowerCase()) {
    case 'clear':
      return `<img class="weather-anim" src="https://img.icons8.com/fluency/48/sun.png" alt="Clear" title="Clear sky" />`;
    case 'clouds':
      return `<img class="weather-anim" src="https://img.icons8.com/fluency/48/cloud.png" alt="Clouds" title="Cloudy" />`;
    case 'rain':
      return `<img class="weather-anim" src="https://img.icons8.com/fluency/48/rain.png" alt="Rain" title="Rainy" />`;
    case 'thunderstorm':
      return `<img class="weather-anim" src="https://img.icons8.com/fluency/48/storm.png" alt="Thunderstorm" title="Thunderstorm" />`;
    case 'drizzle':
      return `<img class="weather-anim" src="https://img.icons8.com/fluency/48/light-rain-2.png" alt="Drizzle" title="Drizzle" />`;
    case 'snow':
      return `<img class="weather-anim" src="https://img.icons8.com/fluency/48/snow.png" alt="Snow" title="Snow" />`;
    default:
      return `<img class="weather-anim" src="https://img.icons8.com/fluency/48/partly-cloudy-day.png" alt="Weather" title="Weather" />`;
  }
}

function setWeatherBackground(condition) {
  const weatherInfo = document.getElementById('weather-info');
  if (!weatherInfo) return;
  let bg = '#e0f7fa';
  switch (condition.toLowerCase()) {
    case 'clear':
      bg = 'linear-gradient(120deg, #ffe082 60%, #fffde7 100%)';
      break;
    case 'clouds':
      bg = 'linear-gradient(120deg, #b0bec5 60%, #eceff1 100%)';
      break;
    case 'rain':
    case 'drizzle':
      bg = 'linear-gradient(120deg, #90caf9 60%, #e3f2fd 100%)';
      break;
    case 'thunderstorm':
      bg = 'linear-gradient(120deg, #616161 60%, #bdbdbd 100%)';
      break;
    case 'snow':
      bg = 'linear-gradient(120deg, #e1f5fe 60%, #fff 100%)';
      break;
    default:
      bg = 'linear-gradient(120deg, #e0f7fa 60%, #b3e5fc 100%)';
  }
  weatherInfo.style.background = bg;
}

function showWeatherLoading() {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `<div class='weather-card'><div class='weather-row'><span class='weather-anim' style='width:48px;height:48px;'><svg width='48' height='48' viewBox='0 0 48 48'><circle cx='24' cy='24' r='20' stroke='#2196F3' stroke-width='4' fill='none' stroke-dasharray='100' stroke-dashoffset='60'><animate attributeName='stroke-dashoffset' values='60;0;60' dur='1.2s' repeatCount='indefinite'/></circle></svg></span><span>Loading weather...</span></div></div>`;
}

// Fetch weather for Singapore using OpenWeatherMap API
function fetchSingaporeWeather() {
  const apiKey = '945569d74ed6c43fd7c3dffbd7bb2f37'; // Replace with your OpenWeatherMap API key
  const singapore = { lat: 1.3521, lng: 103.8198 };
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${singapore.lat}&lon=${singapore.lng}&units=metric&appid=${apiKey}`;
  const weatherInfo = document.getElementById('weather-info');
  showWeatherLoading();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        setWeatherBackground(data.weather[0].main);
        const thermometerIcon = '<img src="https://img.icons8.com/fluency/48/thermometer.png" alt="Thermometer" title="Temperature" style="vertical-align:middle;width:32px;height:32px;">';
        const windIcon = '<img src="https://img.icons8.com/fluency/48/wind.png" alt="Wind" title="Wind Speed" style="vertical-align:middle;width:32px;height:32px;">';
        const humidityIcon = '<img src="https://img.icons8.com/fluency/48/hygrometer.png" alt="Humidity" title="Humidity" style="vertical-align:middle;width:32px;height:32px;">';
        const weatherAnim = getWeatherAnim(data.weather[0].main);
        weatherInfo.innerHTML = `
          <div class='weather-card'>
            <div class='weather-row'>
              ${weatherAnim}
              <div>
                <strong>Weather in Singapore</strong><br>
                <span title='${data.weather[0].description}'>${data.weather[0].main} <span style='font-size:0.9em;color:#666;'>(${data.weather[0].description})</span></span>
              </div>
            </div>
            <div class='weather-row' title='Temperature'>
              ${thermometerIcon}
              <span>Temp: ${data.main.temp}&deg;C</span>
            </div>
            <div class='weather-row' title='Wind speed in meters per second'>
              ${windIcon}
              <span>Wind: ${data.wind.speed} m/s</span>
            </div>
            <div class='weather-row' title='Humidity'>
              ${humidityIcon}
              <span>Humidity: ${data.main.humidity}%</span>
            </div>
          </div>
        `;
      } else {
        weatherInfo.innerHTML = `<div class='weather-card'>Weather data unavailable.</div>`;
      }
    })
    .catch(() => {
      weatherInfo.innerHTML = `<div class='weather-card'>Weather data unavailable.</div>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  // Join button interaction
  document.getElementById('join-btn').addEventListener('click', () => {
    alert('Feature coming soon: Join a beach cleanup!');
  });

  // Dynamically load Google Maps script
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAzd5vpzwowMo11vUGexdjNE2QG5fF2ZR4&callback=initMap';
  script.async = true;
  document.body.appendChild(script);

  // Placeholder: Load weather
  document.getElementById('weather-info').textContent = 'Weather data coming soon!';

  // Fetch weather for Singapore
  fetchSingaporeWeather();
});
