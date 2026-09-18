 export async function fetchCoordinates(addressString){

    const encodedAddress = encodeURIComponent(addressString);

    const url =`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1&accept-language=ru`;

    try{
        const response = await fetch(url ,{
            headers:{
                'User-Agent': 'RouteApp/1.0 (contact: al.social72@gmail.com)'
            }
        });

        if(!response.ok) throw new Error(`Данное название не существует! Ошибка:${response.status}`);

        const data = await response.json();

        if(data && data.length > 0){
            const firstResult = data[0];

            const lat = parseFloat(firstResult.lat);
            const lon =parseFloat(firstResult.lon);

            return [lat , lon]
        }else{
            console.warn('База данных такой адресс не смогла найти !')
            return null;

        }

    }catch(error){
      console.error(' произошла техническая ошибка при поиске:',error);
      return null;
    }

}