// Fetch weather data but keep the background static
let weather = {
  apiKey: "b211c727c8ff52789c8b3b7dda2b0f8b",
  fetchWeather: function (city) {
    const spinner = document.querySelector(".spinner");
    if (spinner) spinner.style.display = "block";

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (spinner) spinner.style.display = "none";
        if (!response.ok) {
          throw new Error("City not found. Please check the city name.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.error("Error:", error.message);
        document.querySelector(".city").innerText = error.message;
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " m/s";

    const weatherDiv = document.querySelector(".weather");
    if (weatherDiv) weatherDiv.classList.remove("loading");
  },
  search: function () {
    const city = document.querySelector(".search-bar").value.trim();
    if (!city) {
      document.querySelector(".city").innerText = "Please enter a valid city.";
      return;
    }
    this.fetchWeather(city);
  },
};

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Default city on page load
weather.fetchWeather("Oklahoma");
