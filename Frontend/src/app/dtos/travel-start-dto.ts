export interface TravelStartDto {
  originAirportCode: string;
  maxRadius: number;
  targetWeather: string;
  minimalTemperature: number;
  maximalTemperature: number;
}
