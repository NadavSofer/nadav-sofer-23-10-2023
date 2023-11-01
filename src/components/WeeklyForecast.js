import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShortDate, getDayOfTheWeek, getShortTime } from '../helpers/dates';
import { setSunHoursAction, setTempRangeAction } from '../redux/actions';
import WeatherIconHelper from './WeatherIconHelper';
import { useSnackbar } from 'notistack';



const WeeklyForecast = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const cityKey = useSelector((state) => state.weatherData.cityData.cityKey);
    const metric = useSelector((state) => state.weatherData.metric);
    const [forecast, setForecast] = useState([]);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();



    useEffect(() => {
        getForecastWeather(cityKey);
    }, [cityKey]);



    const getForecastWeather = (cityKey) => {
        fetch(`${BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=${metric}&details=true`)
            .then(res => res.json())
            .then(data => {
                setForecast([])
                data.DailyForecasts.forEach(daily => {
                    const dailyData = {
                        date: getShortDate(daily.Date),
                        weekDay: getDayOfTheWeek(daily.Date),
                        iconNumber: daily.Day.Icon,
                        weatherText: daily.Day.IconPhrase,
                        maxTemp: `${daily.Temperature.Maximum.Value}${daily.Temperature.Maximum.Unit}`,
                        minTemp: `${daily.Temperature.Minimum.Value}${daily.Temperature.Minimum.Unit}`,
                    }
                    setForecast(prevList => [...prevList, dailyData]);

                    const todaySunHours = { sunrise: getShortTime(data.DailyForecasts[0].Sun.Rise), sunset: getShortTime(data.DailyForecasts[0].Sun.Set) };
                    dispatch(setSunHoursAction(todaySunHours));
                });
                const TempRange = `${data.DailyForecasts[0].Temperature.Maximum.Value}${data.DailyForecasts[0].Temperature.Maximum.Unit}° - ${data.DailyForecasts[0].Temperature.Minimum.Value}${data.DailyForecasts[0].Temperature.Minimum.Unit}°`;
                dispatch(setTempRangeAction(TempRange));
            })
            .catch(e => {
                handleOpenSnack(e);
            })
    }

    const handleOpenSnack = (e, type) => {
        enqueueSnackbar(`${e.message} 5 day forecast`, {variant: 'error'});
    }

    return (
        <div className='flex w-full gap-4 flex-col lg:flex-row text-center h-2/5 justify-center items-center pb-5 lg:pb-0'>
            {forecast.length ? forecast.map((day, i) => {
                return (
                    <div key={i} className='flex flex-col justify-center items-center gap-4 bg-secondaryBG rounded-xl w-full lg:w-1/5 h-4/5 py-2 '>
                        <p className='font-bold'>{day.weekDay}, {day.date}</p>
                        <div >
                            <WeatherIconHelper number={day.iconNumber} size={3}></WeatherIconHelper>
                            <p className='text-xl'>{day.minTemp} - {day.maxTemp}</p>
                        </div>
                        <div>{day.weatherText}</div>
                    </div>
                )
            }) :
                (
                    <></>
                )}
        </div>
    )
}

export default WeeklyForecast

