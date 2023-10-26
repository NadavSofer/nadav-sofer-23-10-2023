import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShortDate, getDayOfTheWeek, getShortTime } from '../helpers/dates';
import TempData from './TempData.json';
import { setSunHoursAction, setTempRangeAction, setWeatherIconAction } from '../redux/actions';
import Favorite from '@mui/icons-material/Favorite';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const WeeklyForecast = () => {

    const cityKey = useSelector((state) => state.weatherData.cityData.cityKey);
    const metric = useSelector((state) => state.weatherData.metric);
    const [forecast, setForecast] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        //getForecastWeather(cityKey);
        setForecast([])
        TempData.DailyForecasts.forEach(daily => {
            const dailyData = {
                date: getShortDate(daily.Date),
                weekDay: getDayOfTheWeek(daily.Date),
                iconNumber: daily.Day.Icon,
                weatherText: daily.Day.IconPhrase,
                maxTemp: `${daily.Temperature.Maximum.Value}${daily.Temperature.Maximum.Unit}°`,
                minTemp: `${daily.Temperature.Minimum.Value}${daily.Temperature.Minimum.Unit}°`,
            }
            setForecast(prevList => [...prevList, dailyData])

            const todaySunHours = { sunrise: getShortTime(TempData.DailyForecasts[0].Sun.Rise), sunset: getShortTime(TempData.DailyForecasts[0].Sun.Set) };
            dispatch(setSunHoursAction(todaySunHours))
        });

        const TempRange = `${TempData.DailyForecasts[0].Temperature.Maximum.Value}${TempData.DailyForecasts[0].Temperature.Maximum.Unit}° - ${TempData.DailyForecasts[0].Temperature.Minimum.Value}${TempData.DailyForecasts[0].Temperature.Minimum.Unit}°`;
        dispatch(setTempRangeAction(TempRange));

        const WeatherIcon = TempData.DailyForecasts[0].Day.Icon;
        dispatch(setWeatherIconAction(WeatherIcon))

    }, [cityKey]);

    const getForecastWeather = (cityKey) => {
        fetch(`${BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=${metric}&details=true`)
            .then(res => res.json())
            .then(data => {
                // console.log('Forecast', data.DailyForecasts);
                data.DailyForecasts.forEach(daily => {
                    const dailyData = {
                        date: getShortDate(daily.Date),
                        weekDay: getDayOfTheWeek(daily.Date),
                        iconNumber: daily.Day.Icon,
                        weatherText: daily.IconPhrase,
                        maxTemp: `${daily.Temperature.Maximum.Value}${daily.Temperature.Maximum.Unit}`,
                        minTemp: `${daily.Temperature.Minimum.Value}${daily.Temperature.Minimum.Unit}`,
                    }

                    setForecast(prevList => [...prevList, dailyData]);

                    const todaySunHours = { sunrise: getShortTime(data.DailyForecasts[0].Sun.Rise), sunset: getShortTime(data.DailyForecasts[0].Sun.Set)};
                    dispatch(setSunHoursAction(todaySunHours));
                });
                // console.log(forecast);
                const TempRange = `${data.DailyForecasts[0].Temperature.Maximum.Value}${data.DailyForecasts[0].Temperature.Maximum.Unit}° - ${data.DailyForecasts[0].Temperature.Minimum.Value}${data.DailyForecasts[0].Temperature.Minimum.Unit}°`;
                dispatch(setTempRangeAction(TempRange));
            })
            .catch(e => {
                console.log(e);
            })
    }


    return (
        <div className='flex gap-4 flex-col lg:flex-row'>
            {forecast.length ? forecast.map((day, i) => {
                return (
                    <div key={i} className=' bg-secondaryBG rounded-xl lg:w-1/5 py-2'>
                        <p>{day.weekDay}, {day.date}</p>
                        <div>
                            <div>{day.iconNumber}</div>
                            <p className='text-xl'>{day.minTemp} - {day.maxTemp}</p>
                        </div>
                        <div>{day.weatherText}</div>
                        <Favorite className="material-symbols-rounded">
                        </Favorite>
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

