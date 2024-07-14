const fs = require('fs').promises;
const Papa = require('papaparse');
const { fetchWeatherApi } = require('openmeteo')




const get_cords_by_iata = async (IATA) => {
    
    const filecontent = await fs.readFile('../DATA/top_airports.csv', 'utf-8');
    const { data } = Papa.parse(filecontent, {header: false});

    for (const row of data) {
        if (row[2] == IATA) {
            return {
                latitude: row[5],
                longitude: row[6],
            };
        }
    }

}

const get_all_airports = async () => {

    const filecontent = await fs.readFile('../DATA/top_airports.csv', 'utf-8');
    const { data } = Papa.parse(filecontent, {header: false});

    const airports = []
    for (const row of data) {
        airports.push(row);
    }
    return airports;

}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const R = 6371;
    return R * c;
};

const toRadians = (degrees) => degrees * (Math.PI / 180);

const get_airports_in_radius = async (origin_cords, radius) => {
    //in kilometers

    const airports = await get_all_airports();
    const valid_airports = [];
    for (const airport of airports) {
        const latitude = parseFloat(airport[5]);
        const longitude = parseFloat(airport[6]);
        const distance = calculateDistance(origin_cords.latitude, origin_cords.longitude, latitude, longitude);
        if (distance <= radius) {
            valid_airports.push(airport)
        }
        
    }
    return valid_airports;

}


const close_airports = async (IATA, max_radius, target_weather, minTemp, maxTemp) => {

    const valid_airports = [];
    const origin_cords = await get_cords_by_iata(IATA);
    const aiports_in_radius = await get_airports_in_radius(origin_cords, max_radius);

    for (const airport_in_radius of aiports_in_radius) {

        const parms = {
            "latitude": airport_in_radius[5],
            "longitude": airport_in_radius[6],
            "current": "temperature_2m",
            "forecast_days": 1
        }
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, parms);
    
        //Helper function from api documentation
        /*const range = (start, stop, step) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);*/
    
        const response = responses[0];
    
        const utcOffsetSeconds = response.utcOffsetSeconds();
        /*const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();*/
    
        const current = response.current();
    
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature2m: current.variables(0)?.value(),
                relativeHumidity2m: current.variables(1)?.value(),
                apparentTemperature: current.variables(2)?.value(),
                isDay: current.variables(3)?.value(),
                precipitation: current.variables(4)?.value(),
                rain: current.variables(5)?.value(),
                showers: current.variables(6)?.value(),
                snowfall: current.variables(7)?.value(),
                weatherCode: current.variables(8)?.value(),
                cloudCover: current.variables(9)?.value(),
                pressureMsl: current.variables(10)?.value(),
                surfacePressure: current.variables(11)?.value(),
                windSpeed10m: current.variables(12)?.value(),
                windDirection10m: current.variables(13)?.value(),
                windGusts10m: current.variables(14)?.value(),
            },
        
        };
        
        console.log(weatherData.current)

        //if (weatherData.current.temperature2m > maxTemp || weatherData.current.temperature2m < minTemp) continue;
     
    }

}

(async () => {
    console.log(await close_airports("MUC", 500, null, null, null));
})();

module.exports = {
    close_airports
};