import { fetchCoordinates } from "./api.js";
import { renderRouteLogic, routeState, resetRoute } from "./route.js";
import "./map.js";
import { fetchWeather } from "./weather.js";
import { fetchForecast, renderCard, getOptions } from "./forecast.js";
const beginRouteRef = document.getElementById("begin");
const endRouteRef = document.getElementById("end");
const startMapButtonRef = document.getElementById("startBtn");
const distanceRouteRef = document.getElementById("distanceRoute");
const distanceTimeRouteRef = document.getElementById("distanсeTimeRoute");

const weatherSearchButtonRef = document.getElementById("weatherSearchButton");
const weatherResetButtonRef = document.getElementById("weatherResetButton"); //!!!!!!!
const searchInputRef = document.getElementById("searchInput");
const weatherImageRef = document.getElementById("weatherImage");
const weatherTempRef = document.getElementById("weatherTemp");
const sensationsTempRef = document.getElementById("sensationsTemp");
const sensationsWindRef = document.getElementById("sensationsWind");
const sensationsHumidityRef = document.getElementById("sensationsHumidity");
const forecastWeatherDaysContainerRef = document.getElementById(
  "forecastWeatherDaysContainer",
);

function resetRouteUi() {
  distanceRouteRef.textContent = "0 Km";
  distanceTimeRouteRef.textContent = "0 h";
}

function updateRouteUI(distanceKm, hours, minutes) {
  distanceRouteRef.textContent = `${distanceKm} Km`;
  distanceTimeRouteRef.textContent = `${hours} h ${minutes} min`;
}

startMapButtonRef.addEventListener("click", async (evt) => {
  const beginText = beginRouteRef.value.trim();
  const endText = endRouteRef.value.trim();

  const fetchedCoordsBegin = await fetchCoordinates(beginText);
  const fetchedCoordsEnd = await fetchCoordinates(endText);

  if (fetchedCoordsEnd && fetchedCoordsBegin) {
    routeState.startCoords = fetchedCoordsBegin;
    routeState.endCoords = fetchedCoordsEnd;
    renderRouteLogic(updateRouteUI, resetRouteUi);
  }
});

endRouteRef.addEventListener("input", () => {
  resetRoute(resetRouteUi);
});

beginRouteRef.addEventListener("input", () => {
  resetRoute(resetRouteUi);
});

weatherSearchButtonRef.addEventListener("click", async () => {
  const city = searchInput.value.trim();
  const weatherData = await fetchWeather(fetchCoordinates, city);
  const {
    main: { temp, feels_like: feelsLike, humidity },
    wind: { speed: windSpeed },
    weather: [{ description, icon }],
  } = weatherData;

  sensationsTempRef.textContent = `${feelsLike} °C`;
  sensationsWindRef.textContent = `${(windSpeed * 3.6).toFixed(1)} km/h`;
  sensationsHumidityRef.textContent = `${humidity} %`;
  weatherTempRef.textContent = `${temp} °C`;

  const data = await fetchForecast(fetchCoordinates, city);
  const response = await getOptions(data)
  await renderCard(response, forecastWeatherDaysContainerRef);
});
