import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import TempCurrent from '../components/TempCurrent.json';
import WeeklyForecast from '../components/WeeklyForecast';
import humidityIcon from '../assets/humidity.svg'

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
        // console.log(TempCurrent);
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
        <div className='w-full h-fit lg:h-screen px-20 pt-60 pb-20'>
            <div className='flex h-4/5'>
                <div>
                    <div>

                    </div>
                    {metric && dailyForecast !== undefined ? (
                        <div>
                            <p className='text-6xl'>{`${cityData.city}, ${cityData.country}`}</p>
                            <div className='flex mt-10'>
                                <p className='text-6xl'>{dailyForecast.mainTemp.metric}</p>
                                <p>{weatherIcon}</p>
                            </div>
                            <p className='ml-3'>{`${tempRange}, Feels like ${dailyForecast.feelTemp.metric}`}</p>
                        </div>
                    ) : <></>}
                </div>

                <div>
                    <div></div>
                    <div>
                        <ReactSVG src={humidityIcon}/>
                        <p>{dailyForecast.humidity}%</p>
                    </div>
                    <div></div>
                    {sunHours !== null ? (
                        <div>
                            <div>{sunHours.sunrise} - {sunHours.sunset}</div>
                        </div>
                    ) : <></>}
                </div>
            </div>
            <WeeklyForecast></WeeklyForecast>
        </div>
    )
}

export default WeatherScreen