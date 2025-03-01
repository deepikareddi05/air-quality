const form = document.getElementById("form");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
const resultContainer = document.getElementById("result");
const aqiResult = document.getElementById("aqi");
const coResult = document.getElementById("co");
const no2Result = document.getElementById("no2");
const o3Result = document.getElementById("o3");
const pm2Result = document.getElementById("pm2");
const pm10Result = document.getElementById("pm10");
const so2Result = document.getElementById("so2");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const latitude = latitudeInput.value.trim();
    const longitude = longitudeInput.value.trim();
    
    if (!latitude || !longitude) {
        alert("Please enter valid latitude and longitude.");
        return;
    }

    // OpenWeatherMap Air Pollution API URL with dynamic latitude and longitude
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=f717c143f398d76311760cb8b7064ca4`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log("API Response:", result);

            if (result.list && result.list.length > 0) {
                let readings = result.list[0].components;
                let aqi = result.list[0].main.aqi; // AQI is provided separately

                // Update text content with fallback for undefined values
                aqiResult.textContent = aqi !== undefined ? aqi : "N/A";
                coResult.textContent = readings.co !== undefined ? readings.co : "N/A";
                no2Result.textContent = readings.no2 !== undefined ? readings.no2 : "N/A";
                o3Result.textContent = readings.o3 !== undefined ? readings.o3 : "N/A";
                pm2Result.textContent = readings.pm2_5 !== undefined ? readings.pm2_5 : "N/A";
                pm10Result.textContent = readings.pm10 !== undefined ? readings.pm10 : "N/A";
                so2Result.textContent = readings.so2 !== undefined ? readings.so2 : "N/A";
                
                // Display the result container
                resultContainer.style.display = 'flex';
            } else {
                alert("No data available for the given location.");
                console.error("No data found in the API response.");
            }
        })
        .catch(error => {
            console.error("Error fetching air quality data:", error);
            alert("Failed to retrieve air quality data. Please check your API key, API host, and internet connection.");
        });
});
