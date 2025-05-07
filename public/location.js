function getLocation() {
    const output = document.getElementById("output");
  
    if (!navigator.geolocation) {
      output.innerText = "Geolocation is not supported by your browser.";
      return;
    }
  
    const OPENCAGE_KEY = '6a70709b9f1f4954a6182aeb1f4b6165';
  
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
    
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_KEY}`
        );
        const data = await response.json();
    
        const components = data.results[0].components;
        const city = components.city || components.town || components.village || components.county || 'Unknown location';
    
        output.innerText = `Latitude: ${latitude}, Longitude: ${longitude}\nCity: ${city}`;
      } catch (err) {
        output.innerText = `Error fetching city name: ${err.message}`;
      }
    });
  }
  