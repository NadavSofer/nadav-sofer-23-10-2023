import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TempCurrent from '../components/TempCurrent.json';
import WeeklyForecast from '../components/WeeklyForecast';
import WeatherIconHelper from '../components/WeatherIconHelper';
import humidityIcon from '../assets/humidity.svg';
import UVIndexIcon from '../assets/uvIndex.svg';
import windIcon from '../assets/wind.svg';
import sunriseIcon from '../assets/sunrise.svg';
import sunsetIcon from '../assets/sunset.svg';
import favoriteEmptyIcon from '../assets/favoriteEmptyIcon.svg';
import favoriteFullIcon from '../assets/favoriteFullIcon.svg';
import useLocalStorage from '../helpers/storage';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const WeatherScreen = () => {
    const cityData = useSelector((state) => state.weatherData.cityData);
    const sunHours = useSelector((state) => state.weatherData.sunHours);
    const tempRange = useSelector((state) => state.weatherData.tempRange);
    const metric = useSelector((state) => state.weatherData.metric);
    const [dailyForecast, setDailyForecast] = useState();
    const [favorites, setFavorites] = useLocalStorage('favorites', []);


    useEffect(() => {
        getWeather();
    }, [cityData]);


    const getWeather = () => {
        fetch(`${BASE_URL}/currentconditions/v1/${cityData.cityKey}?apikey=${API_KEY}&metric=${metric}&details=true`)
        .then(res => res.json())
        .then(data => {
            
            const dailyConditions = {
                mainTemp: {
                    metric: `${data[0].Temperature.Metric.Value}${data[0].Temperature.Metric.Unit}°`,
                    imperial: `${data[0].Temperature.Imperial.Value}${data[0].Temperature.Imperial.Unit}°`,
                },
                UVindex: {
                    uvText: data[0].UVIndexText,
                    uvNumber: data[0].UVIndex,
                },
                humidity: data[0].RelativeHumidity,
                weatherIcon: data[0].WeatherIcon,
                wind: {
                    speed: {
                        metric: `${data[0].Wind.Speed.Metric.Value}${data[0].Wind.Speed.Metric.Unit}`,
                        imperial: `${data[0].Wind.Speed.Imperial.Value}${data[0].Wind.Speed.Imperial.Unit}`,
                    },
                    direction: data[0].Wind.Direction.Localized,
                },
                WeatherText: data[0].WeatherText,
                feelTemp: {
                    metric: `${data[0].RealFeelTemperature.Metric.Value}${data[0].RealFeelTemperature.Metric.Unit}°`,
                    imperial: `${data[0].RealFeelTemperature.Imperial.Value}${data[0].RealFeelTemperature.Imperial.Unit}°`,
                },
            }
            setDailyForecast(dailyConditions);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const addToFavorites = () => {
        const existingCity = favorites.find(favorite => favorite.cityKey === cityData.cityKey);
        if (!existingCity) {
            setFavorites((prevFavorites) => [...prevFavorites, cityData]);
        } else {
            console.log('thing');
        }
        console.log(favorites);
    }

    const removeFromFavorites = () => {
        console.log(cityData);
        setFavorites((prevFavorites) => prevFavorites.filter(item => item.cityKey !== cityData.cityKey));
        console.log(favorites);
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
            weatherIcon: TempCurrent[0].WeatherIcon,
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
    }

    return (
        <div className='w-full h-fit lg:h-screen flex flex-col justify-center items-center pt-16 px-5'>
            {dailyForecast ? (
                <div className='flex h-3/5 w-full lg:flex-row flex-col justify-center items-center mb-10 lg:mb-0'>
                    <div className='w-4/5 lg:w-1/3 py-12 flex justify-center items-center border-b-2 lg:border-b-0 lg:border-r-2 border-white'>

                        {metric && dailyForecast !== undefined ? (
                            <div>
                                <div>
                                    {!favorites.some(favorite => favorite.cityKey === cityData.cityKey) ? (
                                        <button className='flex gap-2 pb-4 items-center' onClick={addToFavorites}>
                                            <img src={favoriteEmptyIcon} className='w-5' alt='favoriteButton' />
                                            <p>Add to favorites</p>
                                        </button>
                                    ) : (
                                        <button className='flex gap-2 pb-4 items-center' onClick={removeFromFavorites}>
                                            <img src={favoriteFullIcon} className='w-5' alt='favoriteButton' />
                                            <p>Remove to favorites</p>
                                        </button>
                                    )}

                                </div>
                                <p className='text-6xl'>{`${cityData.city}, ${cityData.country}`}</p>
                                <div className='flex mt-10 items-center gap-5 my-2'>
                                    <p className='text-6xl'>{dailyForecast.mainTemp.metric}</p>
                                    <WeatherIconHelper number={dailyForecast.weatherIcon} size='6' />
                                </div>
                                <p className='ml-3 text-xl mt-4'>{`${tempRange}, Feels like ${dailyForecast.feelTemp.metric}`}</p>
                            </div>
                        ) : <></>}
                    </div>

                    <div className='w-3/5 md:w-full lg:w-2/3 flex flex-col flex-wrap items-center justify-center md:grid md:grid-cols-2 md:justify-items-center text-2xl gap-10 mt-10 lg:mb-0'>
                        <div className='flex justify-around md:justify-left items-center w-1/2 gap-5 '>
                            <img src={UVIndexIcon} className='w-1/3' alt='UVIndexIcon' />
                            <div>
                                <p>UV Index</p>
                                <p>{dailyForecast.UVindex.uvText}</p>
                            </div>

                        </div>
                        <div className='flex justify-around md:justify-left items-center w-2/5 gap-5 '>
                            <img src={humidityIcon} className='w-1/3' alt='humidityIcon' />
                            <div>
                                <p>Humidity</p>
                                <p>{dailyForecast.humidity}%</p>
                            </div>

                        </div>
                        <div className='flex justify-around md:justify-left items-center w-1/2 gap-5 '>
                            <img src={windIcon} className='w-1/3' alt='windIcon' />
                            <div>
                                <p>Wind</p>
                                <p>{`${dailyForecast.wind.speed.metric} ${dailyForecast.wind.direction}`}</p>
                            </div>

                        </div>
                        {sunHours !== null ? (
                            <div className='flex justify-around md:justify-left items-center w-1/2 gap-5 '>
                                <div className='flex flex-col gap-4 justify-center mt-4 items-center'>
                                    <img src={sunriseIcon} className='w-2/3 mb-3' alt='sunriseIcon' />
                                    <p>Sunrise</p>
                                    <p className='text-center -m-4'>{sunHours.sunrise}</p>
                                </div>
                                <div className='flex flex-col gap-4 justify-center mt-4 items-center'>
                                    <img src={sunsetIcon} className='w-2/3 mb-2' alt='sunsetIcon' />
                                    <p>Sunset</p>
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