const API_KEY = "364da8b9c541af35330ab674780471d2";
const cardsContainer = document.getElementById("cards");
let cardCount = 0;

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    if (cardCount >= 15) {
        alert("Maximum 15 cities allowed");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found");
                return;
            }
            createCard(data);
            cardCount++;
            document.getElementById("cityInput").value = "";
        });
}

function createCard(data) {
    const card = document.createElement("div");
    card.className = "weather-card";

    card.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p>🌡 ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
        <p>☁ ${data.weather[0].description}</p>
    `;

    cardsContainer.appendChild(card);
}
