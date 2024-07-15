import { PossibleTravelLocationDto } from "./possible-travel-location-dto";
import { WeatherForecastDto } from "./weather-forecast-dto";

export interface WeatherModalDataDto {
    destination: PossibleTravelLocationDto
    forecast: WeatherForecastDto[];
}
