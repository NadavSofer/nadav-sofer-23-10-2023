import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TempCurrent from '../components/TempCurrent.json';
import WeeklyForecast from '../components/WeeklyForecast';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const WeatherScreen = () => {
    const cityData = useSelector((state) => state.weatherData.cityData);
    const sunHours = useSelector((state) => state.weatherData.sunHours);
    const tempRange = useSelector((state) => state.weatherData.tempRange);
    const metric = useSelector((state) => state.weatherData.metric);
    const weatherIcon = useSelector((state) => state.weatherData.weatherIcon);
    const [dailyForecast, setDailyForecast] = useState();

    useEffect(() => {
        tempFunction();
    }, [cityData]);


    const getWeather = () => {
        fetch(`${BASE_URL}/currentconditions/v1/${cityData.cityKey}?apikey=${API_KEY}&metric=${metric}&details=true`);
    }

    const tempFunction = () => {
        console.log(TempCurrent);
        const dailyConditions = {
            mainTemp: {
                metric: `${TempCurrent[0].Temperature.Metric.Value}${TempCurrent[0].Temperature.Metric.Unit}°`,
                imperial: `${TempCurrent[0].Temperature.Imperial.Value}${TempCurrent[0].Temperature.Imperial.Unit}°`,
            },
            UVindex: {
                uvText: TempCurrent[0].UVIndexText,
                uvNumber: TempCurrent[0].UVIndex,
            },
            humidity: TempCurrent[0].RelativeHumidity,
            wind: {
                speed: {
                    metric: `${TempCurrent[0].Wind.Speed.Metric.Value} ${TempCurrent[0].Wind.Speed.Metric.Unit}`,
                    imperial: `${TempCurrent[0].Wind.Speed.Imperial.Value} ${TempCurrent[0].Wind.Speed.Imperial.Unit}`,
                },
                direction: TempCurrent[0].Wind.Localized,
            },
            WeatherText: TempCurrent[0].WeatherText,
            feelTemp: {
                metric: `${TempCurrent[0].RealFeelTemperature.Metric.Value}${TempCurrent[0].RealFeelTemperature.Metric.Unit}°`,
                imperial: `${TempCurrent[0].RealFeelTemperature.Imperial.Value}${TempCurrent[0].RealFeelTemperature.Imperial.Unit}°`,
            },
        }
        setDailyForecast(dailyConditions);
        console.log(dailyForecast);
    }


    return (
        <div className='w-full px-10'>
            <div className='flex'>
                <div>
                    <div>

                    </div>
                    {metric && dailyForecast !== undefined ? (
                        <div>
                            <p>{`${cityData.city}, ${cityData.country}`}</p>
                            <div className='flex'>
                                <p>{dailyForecast.mainTemp.metric}</p>
                                <p>{weatherIcon}</p>
                            </div>
                            <p>{`${tempRange}, Feels like ${dailyForecast.feelTemp.metric}`}</p>
                        </div>
                    ) : !metric && dailyForecast !== undefined ? (
                        <div>
                            <p>{`${cityData.city}, ${cityData.country}`}</p>
                            <div className='flex'>
                                <p>{dailyForecast.mainTemp.imperial}</p>
                                <p>{weatherIcon}</p>
                            </div>
                            <p>{`${tempRange}, Feels like ${dailyForecast.feelTemp.imperial}`}</p>
                        </div>
                    ) : <></>}

                </div>
                <div>
                    {sunHours !== null ? (
                        <div>
                            <div>{sunHours.sunrise} - {sunHours.sunset}</div>
                            <div>{tempRange}</div>
                        </div>
                    ) : <></>}
                </div>
            </div>
            <WeeklyForecast></WeeklyForecast>
        </div>
    )
}

export default WeatherScreen