const fs = require('fs').promises;
const Papa = require('papaparse');
const { fetchWeatherApi } = require('openmeteo')
const path = require('path');

const get_cords_by_iata = async (i) => {
    try {
        console.log(i);
        const filePath = path.join(__dirname, '../DATA/airport_data.csv');
        const filecontent = await fs.readFile(filePath, 'utf-8');
        const { data } = Papa.parse(filecontent, { header: false });

        for (const row of data) {
            if (row[2] == i) {
                return {
                    latitude: row[5],
                    longitude: row[6],
                };
            }
        }

    } catch (error) {
        console.error(`Error in get_cords_by_iata function: ${error.message}`);
        return "err";
        throw error;
        
    }
}

const get_all_airports = async () => {

    const filecontent = await fs.readFile('../DATA/target_airports.csv', 'utf-8');
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

        if (origin_cords.latitude - parseFloat(airport[5]) == 0 && origin_cords.longitude - parseFloat(airport[6]) == 0) {
            continue
        }
        
        const latitude = parseFloat(airport[5]);
        const longitude = parseFloat(airport[6]);
        const distance = calculateDistance(origin_cords.latitude, origin_cords.longitude, latitude, longitude);
        if (distance == 0) continue;
        if (distance <= radius) {
            valid_airports.push(airport)
        }
        
    }
    return valid_airports;

}


const close_airports = async (IATA, max_radius, target_weather, minTemp, maxTemp) => {

    const valid_airports = [];
    let origin_cords = [];
    try {
        origin_cords = await get_cords_by_iata(IATA);
    } catch ({ name, message }){
        console.log(name, message);
        throw new Error(`Airport with IATA code ${IATA} not found`); 
    }

    const airports_in_radius = await get_airports_in_radius(origin_cords, max_radius);

    for (const airport_in_radius of airports_in_radius) {

        const parms = {
            "latitude": airport_in_radius[5],
            "longitude": airport_in_radius[6],
            "current": ["temperature_2m", "rain", "showers", "snowfall", "cloud_cover"],
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
            temperature2m: current.variables(0).value(),
            rain: current.variables(1).value(),
            showers: current.variables(2).value(),
            snowfall: current.variables(3).value(),
            cloudCover: current.variables(4).value(),
            },
        
        };
    
        if (weatherData.current.temperature2m > maxTemp || weatherData.current.temperature2m < minTemp) continue;

        const distance = calculateDistance(origin_cords.latitude, origin_cords.longitude, airport_in_radius[5], airport_in_radius[6]);

        switch (target_weather) {
            case "sunny":
                if (weatherData.current.showers == 0 && weatherData.current.rain == 0 && weatherData.current.cloudCover <= 70) {
                    valid_airports.push({
                        destinationAirportCountry: airport_in_radius[0],
                        destinationAirportCode: airport_in_radius[2],
                        destinationAirportName: airport_in_radius[4],
                        distance: distance,
                        target_weather: "sunny",
                        locationTemperature: weatherData.current.temperature2m,
                        imageUrl: 'cooming soon!'
                    });
                }
                break;
            case "cloudy":
                if (weatherData.current.cloudCover > 90) {
                    valid_airports.push({
                        destinationAirportCountry: airport_in_radius[0],
                        destinationAirportCode: airport_in_radius[2],
                        destinationAirportName: airport_in_radius[4],
                        distance: distance,
                        target_weather: "cloudy",
                        locationTemperature: weatherData.current.temperature2m,
                        imageUrl: 'cooming soon!'
                    });
                }
                break;
            case "rainy":
                if (weatherData.current.showers > 0.2) {
                    valid_airports.push({
                        destinationAirportCountry: airport_in_radius[0],
                        destinationAirportCode: airport_in_radius[2],
                        destinationAirportName: airport_in_radius[4],
                        distance: distance,
                        target_weather: "rainy",
                        locationTemperature: weatherData.current.temperature2m,
                        imageUrl: 'cooming soon!'
                    }); 
                }
            
                break;
            case "snowy":
                if (weatherData.current.snowfall > 0) {
                    valid_airports.push({
                        destinationAirportCountry: airport_in_radius[0],
                        destinationAirportCode: airport_in_radius[2],
                        destinationAirportName: airport_in_radius[4],
                        distance: distance,
                        target_weather: "snowy",
                        locationTemperature: weatherData.current.temperature2m,
                        imageUrl: 'cooming soon!'
                    }); 
                }
                break;
        
            default:
                return [];
                break;
        }



    }

    return valid_airports;

}

const get_airport_weather = async (iata) => {

    const cords = await get_cords_by_iata(iata);
    console.log(cords.latitude +  " | " + cords.longitude)

    try {
        const params = {
            "latitude": cords.latitude,
            "longitude": cords.longitude,
            "daily": ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max", "uv_index_clear_sky_max", "rain_sum", "showers_sum", "snowfall_sum", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"],
            "timezone": "Europe/Berlin"
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        const range = (start, stop, step) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();
        
        const daily = response.daily();
        
        const weatherData = {
        
            daily: {
                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2mMax: daily.variables(0)?.valuesArray(),
                temperature2mMin: daily.variables(1)?.valuesArray(),
                sunrise: daily.variables(2)?.valuesArray(),
                sunset: daily.variables(3)?.valuesArray(),
                daylightDuration: daily.variables(4)?.valuesArray(),
                sunshineDuration: daily.variables(5)?.valuesArray(),
                uvIndexMax: daily.variables(6)?.valuesArray(),
                uvIndexClearSkyMax: daily.variables(7)?.valuesArray(),
                rainSum: daily.variables(8)?.valuesArray(),
                showersSum: daily.variables(9)?.valuesArray(),
                snowfallSum: daily.variables(10)?.valuesArray(),
                windSpeed10mMax: daily.variables(11)?.valuesArray(),
                windGusts10mMax: daily.variables(12)?.valuesArray(),
                windDirection10mDominant: daily.variables(13)?.valuesArray(),
            },
        
        };
        
        const resp = [];

        for (let i = 0; i < weatherData.daily.time.length; i++) {
            
            resp.push({
                time: weatherData.daily.time[i],
                temperature2mMax: weatherData.daily.temperature2mMax[i],
                temperature2mMin: weatherData.daily.temperature2mMin[i],
                daylightDuration: weatherData.daily.daylightDuration[i],
                sunshineDuration: weatherData.daily.sunshineDuration[i],
                uvIndexMax: weatherData.daily.uvIndexMax[i],
                uvIndexClearSkyMax: weatherData.daily.uvIndexClearSkyMax[i],
                rainSum: weatherData.daily.rainSum[i],
                showersSum: weatherData.daily.showersSum[i],
                snowfallSum: weatherData.daily.snowfallSum[i],
                windSpeed10mMax: weatherData.daily.windSpeed10mMax[i],
                windGusts10mMax: weatherData.daily.windGusts10mMax[i],
                windDirection10mDominant: weatherData.daily.windDirection10mDominant[i]
            });
            
           
        }
        return resp;
    } catch(e) {console.error("Errow while fetching: " + e);}

    

};

module.exports = {
    close_airports,
    get_cords_by_iata,
    get_airport_weather
};