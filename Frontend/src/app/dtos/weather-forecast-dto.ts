export interface WeatherForecastDto {
    time: string;
    temperature2mMax: number;
    temperature2mMin: number;
    daylightDuration: number;
    sunshineDuration: number;
    uvIndexMax: number;
    uvIndexClearSkyMax: number;
    rainSum: number;
    showersSum: number;
    snowfallSum: number;
    windSpeed10mMax: number;
    windGusts10mMax: number;
    windDirection10mDominant: number;
}
