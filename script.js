document.addEventListener('DOMContentLoaded', () => {
    const cityinput = document.getElementById("city-input");
    const Getweatherbtn = document.getElementById("get-weather-btn");
    const weatherinfo = document.getElementById("weather-info");
    const cityinfo = document.getElementById("city-name");
    const temperatureinfo = document.getElementById("temperature");
    const descriptioninfo = document.getElementById("description");
    const errormessage = document.getElementById("error-message");

    const API_Keys = "4cb21d57027d52a9fa762d0b8ab30fa2";

    // Event listener for the weather button
    Getweatherbtn.addEventListener('click', async () => {
        const city = cityinput.value.trim();
        if (!city) {
            console.log("City name is empty.");
            return;
        }

        try {
            console.log("Fetching weather data for:", city);
            const weatherdata = await fetchweatherdata(city); // Await the result of fetchweatherdata
            displayweatherdata(weatherdata); // Display weather data
        } catch (error) {
            console.error("Error fetching data:", error.message);
            showerrormessage();
        }
    });

    // Fetch weather data from the API
    async function fetchweatherdata(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Keys}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not Found");
        }

        // Parse the JSON data from the API
        const data = await response.json();
        console.log("Weather data received:", data);
        return data;
    }

    // Function to display weather data
    function displayweatherdata(data) {
        console.log(data);
        const { name, main, weather } = data;

        // Display data in the UI
        cityinfo.textContent = name;

        // Make sure the weather info is shown and error message is hidden
        weatherinfo.classList.remove("hidden");                          
        errormessage.classList.add('hidden');  
    }

    // Show an error message if city not found
    function showerrormessage() {
        weatherinfo.classList.remove('hidden'); // Hide weather info
        errormessage.classList.add('hidden'); // Show error message
    }
});
