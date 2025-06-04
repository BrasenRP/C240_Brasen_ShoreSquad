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

// Fetch weather for Singapore using OpenWeatherMap API
function fetchSingaporeWeather() {
  const apiKey = '945569d74ed6c43fd7c3dffbd7bb2f37'; // Replace with your OpenWeatherMap API key
  const singapore = { lat: 1.3521, lng: 103.8198 };
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${singapore.lat}&lon=${singapore.lng}&units=metric&appid=${apiKey}`;
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.textContent = 'Loading weather...';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        // Weather icons
        const thermometerIcon = '<img src="https://img.icons8.com/fluency/48/thermometer.png" alt="Thermometer" title="Temperature" style="vertical-align:middle;width:32px;height:32px;">';
        const windIcon = '<img src="https://img.icons8.com/fluency/48/wind.png" alt="Wind" title="Wind Speed" style="vertical-align:middle;width:32px;height:32px;">';
        const weatherIcon = `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt='${data.weather[0].main}' title='${data.weather[0].description}' style='vertical-align:middle;width:48px;height:48px;'>`;
        weatherInfo.innerHTML = `
          <div style='display:flex;align-items:center;gap:1rem;'>
            ${weatherIcon}
            <div>
              <strong>Weather in Singapore</strong><br>
              ${data.weather[0].main} (${data.weather[0].description})
            </div>
          </div>
          <div style='display:flex;align-items:center;gap:0.5rem;'>
            ${thermometerIcon}
            <span>Temp: ${data.main.temp}&deg;C</span>
          </div>
          <div style='display:flex;align-items:center;gap:0.5rem;'>
            ${windIcon}
            <span>Wind: ${data.wind.speed} m/s</span>
          </div>
          <div style='margin-top:0.5rem;'>Humidity: ${data.main.humidity}%</div>
        `;
      } else {
        weatherInfo.textContent = 'Weather data unavailable.';
      }
    })
    .catch(() => {
      weatherInfo.textContent = 'Weather data unavailable.';
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
