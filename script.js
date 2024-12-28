document.addEventListener('DOMContentLoaded',() =>{
    const cityinput = document.getElementById("city-input");
    const Getweatherbtn = document.getElementById("get-weather-btn");
    const weatherinfo = document.getElementById("weather-info");
    const cityinfo = document.getElementById("city-name");
    const temperatureinfo = document.getElementById("temperature");
    const descriptioninfo = document.getElementById("description");
    const errormessage = document.getElementById("error-message");

    const API_Keys = "4cb21d57027d52a9fa762d0b8ab30fa2";

    Getweatherbtn.addEventListener('click', () => {
        const city = cityinput.value.trim();
        if(!city) return;

        try {
            const weatherdata = await fetchweatherdata(city);
        } catch (error) {
            showerrormessage();
        }

    })

    async function fetchweatherdata(city){
        const url = `https://api.openweathermap.org/data/3.0/weather?q=${city}&units=metric&appid={API key}`;

        const response = await fetch(url);
        console.log("RESPONSE :",response);

        if(!response.ok){
            throw new Error("City not Found");
        }
    }

    function displayweatherdata(weatherdata){

    }

    function showerrormessage(){
        weatherinfo.classList.add('hidden');
        errormessage.classList.remove('hidden');
    }

})