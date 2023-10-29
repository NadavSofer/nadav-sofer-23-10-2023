import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import TempCurrent from '../components/TempCurrent.json';
import WeeklyForecast from '../components/WeeklyForecast';
import WeatherIconHelper from '../components/WeatherIconHelper';
import humidityIcon from '../assets/humidity.svg';
import UVIndexIcon from '../assets/uvIndex.svg';
import windIcon from '../assets/wind.svg';
import sunriseIcon from '../assets/sunrise.svg';
import sunsetIcon from '../assets/sunset.svg';

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
                    metric: `${TempCurrent[0].Wind.Speed.Metric.Value}${TempCurrent[0].Wind.Speed.Metric.Unit}`,
                    imperial: `${TempCurrent[0].Wind.Speed.Imperial.Value}${TempCurrent[0].Wind.Speed.Imperial.Unit}`,
                },
                direction: TempCurrent[0].Wind.Direction.Localized,
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
        <div className='w-full h-fit lg:h-screen flex flex-col justify-center items-center pt-16 px-5'>
            {dailyForecast ? (
                <div className='flex h-3/5 w-full lg:flex-row flex-col justify-center items-center mb-10 lg:mb-0'>
                    <div className='w-full lg:w-1/3 py-12 flex justify-center items-center border-b-2 lg:border-b-0 lg:border-r-2 border-white'>
                        <div>

                        </div>
                        {metric && dailyForecast !== undefined ? (
                            <div>
                                <p className='text-6xl'>{`${cityData.city}, ${cityData.country}`}</p>
                                <div className='flex mt-10 items-center gap-5 my-2'>
                                    <p className='text-6xl'>{dailyForecast.mainTemp.metric}</p>
                                    <WeatherIconHelper number={weatherIcon} size='20' />
                                </div>
                                <p className='ml-3 text-xl mt-4'>{`${tempRange}, Feels like ${dailyForecast.feelTemp.metric}`}</p>
                            </div>
                        ) : <></>}
                    </div>

                    <div className='w-full lg:w-2/3 md:grid md:grid-cols-2 justify-items-center text-2xl gap-10 mt-10 lg:mb-0'>
                        <div className='flex justify-left items-center w-1/2 gap-5'>
                            <img src={UVIndexIcon} className='w-1/3' />
                            <p>{dailyForecast.UVindex.uvText}</p>
                        </div>
                        <div className='flex justify-left items-center w-2/5 gap-5'>
                            <img src={humidityIcon} className='w-1/3' />
                            <p>{dailyForecast.humidity}%</p>
                        </div>
                        <div className='flex justify-left items-center w-1/2 gap-5'>
                            <img src={windIcon} className='w-1/3' />
                            <p>{`${dailyForecast.wind.speed.metric} ${dailyForecast.wind.direction}`}</p>
                        </div>
                        {sunHours !== null ? (
                            <div className='flex justify-left items-center w-1/2 gap-5'>
                                <div className='flex flex-col gap-4 justify-center mt-4 items-center'>
                                <img src={sunriseIcon} className='w-2/3 mb-2' />
                                    <p className='text-center -m-4'>{sunHours.sunrise}</p>
                                </div>
                                <div className='flex flex-col gap-4 justify-center mt-4 items-center'>
                                <img src={sunsetIcon} className='w-2/3 mb-2' />
                                    <p className='text-center -m-5 -pt-5'>{sunHours.sunset}</p>
                                </div>
                            </div>
                        ) : <></>}
                    </div>
                </div>
            ) : <></>}
            <WeeklyForecast></WeeklyForecast>
        </div>
    )
}

export default WeatherScreen