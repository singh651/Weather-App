document.addEventListener('DOMContentLoaded', () => {
    const cityinput = document.getElementById("city-input");
    const Getweatherbtn = document.getElementById("get-weather-btn");
    const weatherinfo = document.getElementById("weather-info");
    const cityinfo = document.getElementById("city-name");
    const temperatureinfo = document.getElementById("temperature");
    const descriptioninfo = document.getElementById("description");
    const errormessage = document.getElementById("error-message");

    const API_Keys = "4cb21d57027d52a9fa762d0b8ab30fa2";

    // Make the event handler async to use await inside
    Getweatherbtn.addEventListener('click', async () => {
        const city = cityinput.value.trim();
        if (!city) return;

        try { 
            const weatherdata = await fetchweatherdata(city); // Await the result of fetchweatherdata
            displayweatherdata(weatherdata); // Display weather data
            errormessage.classList.add('hidden'); // Hide error message if successful
        } catch (error) {
            showerrormessage();
        }
    });

    async function fetchweatherdata(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Keys}`; // Use correct API key

        const response = await fetch(url);
        console.log("RESPONSE:", response);

        if (!response.ok) {
            throw new Error("City not Found");
        }

        // Return the weather data parsed as JSON
        const data = await response.json();
        return data;
    }

    function displayweatherdata(data) {
        console.log(data);  
        const { name, main, weather } = data; // Correct the variable to weatherdata
        cityinfo.textContent = name; // City name
        temperatureinfo.textContent = `Temperature: ${main.temp}°C`; // Temperature
        descriptioninfo.textContent = `Weather: ${weather[0].description}`; // Weather description
    
        weatherinfo.classList.remove('hidden'); // Show the weather info
        errormessage.classList.add('hidden'); // Hide error message if data is successfully displayed
    }

    function showerrormessage() {
        weatherinfo.classList.remove('hidden'); // Hide weather info if an error occurs
        errormessage.classList.add('hidden'); // Show error message
    }
});