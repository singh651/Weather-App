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
        return await response.json();
    }

    function displayweatherdata(weatherdata) {
        cityinfo.textContent = weatherdata.name;
        temperatureinfo.textContent = `Temperature: ${weatherdata.main.temp}°C`;
        descriptioninfo.textContent = `Weather: ${weatherdata.weather[0].description}`;
        weatherinfo.classList.remove('hidden'); // Show the weather info
    }

    function showerrormessage() {
        weatherinfo.classList.add('hidden');
        errormessage.classList.remove('hidden'); // Show error message
    }
});
