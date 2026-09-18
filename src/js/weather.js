

export  async function fetchWeather (fetchCoordinatesCallback , city){
if (!fetchCoordinatesCallback || !city) return null;    

const API_KEY ='20c363a59638c7723627a7b55afb3374';


    const searchedCity =  await fetchCoordinatesCallback(city);

    if (!searchedCity || searchedCity.length < 2) {
      alert('Город не найден!');
      return null;
    }

    const [lat, lon] = searchedCity;
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
   try{
      const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const data = await response.json();
    return data;

   } catch (error) {

    console.error(error);
    alert('Произошла ошибка, попробуйте позже!');
    return null;
  }
}