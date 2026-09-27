export async function fetchForecast(fetchCoordinatesCallback, city) {
  const API_KEY = "7a3cab6021234f75b3c61751262709";
  const searchedCity = await fetchCoordinatesCallback(city);
  if (!searchedCity || searchedCity.length < 2) {
    alert("Город не найден!");
    return null;
  }

  const [lat, lon] = searchedCity;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&lang=ru&aqi=no&alerts=no`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    alert("Произошла ошибка, попробуйте позже!");
    return null;
  }
  ``;
}

export function getOptions(data) {
  const forecastDay = data.forecast.forecastday;
  const result = [];
  for (let i = 0; i < forecastDay.length; i++) {
    const day = forecastDay[i];
    result.push({
      dateName: day.date, // "2026-09-28"
      tempMax: day.day.maxtemp_c, // 25.4
      tempMin: day.day.mintemp_c, // 15.8
      tempAvg: day.day.avgtemp_c, // 19.9
      windMaxKmh: day.day.maxwind_kph, // 15.5
      humidity: day.day.avghumidity, // 49
      status: day.day.condition.text, // "Пасмурно"
      icon: `https:${day.day.condition.icon}`, // "//cdn.weatherapi.com/..."
    });
  }
  return result;
}

//    return {
//      date: forecastDay.date, // "2026-09-28"
//      tempMax: forecastDay.day.maxtemp_c, // 25.4
//      tempMin: forecastDay.day.mintemp_c, // 15.8
//      tempAvg: forecastDay.day.avgtemp_c, // 19.9
//      windMaxKmh: forecastDay.day.maxwind_kph, // 15.5
//      humidity: forecastDay.day.avghumidity, // 49
//      status: forecastDay.day.condition.text, // "Пасмурно"
//      icon: forecastDay.day.condition.icon, // "//cdn.weatherapi.com/..."
//    };

export function renderCard(data, parent) {
  let markup =data.map((day) => {
    const {
      dateName,
      tempMax,
      tempMin,
      tempAvg,
      windMaxKmh,
      humidity,
      status,
      icon,
      } = day;
      
      return `<li class="section-weather__prediction-item">
                  <img
                  class="section-weather__prediction-img"
                  src="${icon}"
                  alt="${status}"
                  height="64px"
                  width="64px"
                  />
                  <p class="section-weather__prediction-text-style" >${dateName}</p>
                  <h4 class="section-weather__prediction-text-style">${status}</h4>
                  <p class="section-weather__prediction-text-style">MIN:${tempMin}°C  MAX:${tempMax}°C</p>
                  <p class="section-weather__prediction-text-style">${windMaxKmh} km/h</p>
              </li>`;
  }).join("");
    
     parent.innerHTML += markup;

  //  `<li class="section-weather__prediction-item">
  //                    <img
  //                    class="section-weather__prediction-img"
  //                    src="../assets/images/weather-2-svgrepo-com.svg"
  //                    alt=""
  //                    height="64px"
  //                    width="64px"
  //                    />
  //                    <p class="section-weather__prediction-text-style" >${}</p>
  //                    <h4 class="section-weather__prediction-text-style">${}</h4>
  //                    <p class="section-weather__prediction-text-style">${}</p>
  //                    <p class="section-weather__prediction-text-style">${}</p>
  //                </li>`;

  // parent.innerHTML += markup;
}

// функция для отображения иконки с запросом на сервер и отображением её
