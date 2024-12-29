const fetchWeather = async (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1362c34423375d167d694489b1c74080&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const result = await response.json();
        console.log(result);

        // Update Weather Title
        document.getElementById("weatherTitle").innerText = `Weather for ${city}`;
        // Access nested properties correctly
        document.getElementById("temp").innerText = result.main.temp;
        document.getElementById("min_temp").innerText = result.main.temp_min;
        document.getElementById("max_temp").innerText = result.main.temp_max;
        document.getElementById("CLoud_pct").innerText = result.clouds.all;
        document.getElementById("Feels_like").innerText = result.main.feels_like;
        document.getElementById("Humidity").innerText = result.main.humidity;
        document.getElementById("Wind_speed").innerText = result.wind.speed;
        // Convert sunrise and sunset timestamps to readable times
        const sunriseTime = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(result.sys.sunset * 1000).toLocaleTimeString();


        document.getElementById("Sunrise").innerText = sunriseTime;
        document.getElementById("Sunset").innerText = sunsetTime;


    } catch (error) {
        console.error('Error:', error);
        document.getElementById("weatherTitle").innerText = "Failed to fetch weather details. Please try with correct city name"
    }
};


document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
});



const cities = ["shanghai", "boston", "lucknow", "new york", "chennai", "tamil nadu"];
const populateTable = async () => {
  const tableBody = document.getElementById('weatherTableBody');

    for( const city of cities){
        try{
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1362c34423375d167d694489b1c74080&units=metric`;
            const response = await fetch(url);
                if(!response.ok){
                   throw new Error(`Failed to fetch weather data for ${city}`);
                }

              const result = await response.json();
               const sunriseTime = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
                const sunsetTime = new Date(result.sys.sunset * 1000).toLocaleTimeString();


               const row = `
               <tr>
                 <th scope="row" class="text-start">${city}</th>
                <td>${result.clouds.all}</td>
                <td>${result.main.feels_like}</td>
                <td>${result.main.humidity}</td>
                <td>${result.main.temp_max}</td>
                 <td>${result.main.temp_min}</td>
                <td>${sunriseTime}</td>
                <td>${sunsetTime}</td>
                <td>${result.main.temp}</td>
                 <td>${result.wind.deg}</td>
                <td>${result.wind.speed}</td>
               </tr>

            `
            tableBody.innerHTML += row;
        }
        catch (error) {
           console.error(`Error populating table for ${city}:`, error);

        }

    }

};

populateTable();