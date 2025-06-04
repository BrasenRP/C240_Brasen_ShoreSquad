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

  // Placeholder: Load events
  document.getElementById('event-list').innerHTML = '<li>Event loading soon!</li>';
});
