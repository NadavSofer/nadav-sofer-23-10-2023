import React, { useEffect, useState } from 'react';
import WeatherIconHelper from './WeatherIconHelper';
import { setCityDataAction } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useSnackbar } from 'notistack';


const Favorite = (props) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const metric = useSelector((state) => state.weatherData.metric);
    const [favoriteData, setFavoriteData] = useState();
    const [CityData, setCityData] = useState(props.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [failedToLoad, setFailedToLoad] = useState(false);


    useEffect(() => {
        getFavoriteData()
    }, []);

    const handleSelectFavorite = (data) => {
        dispatch(setCityDataAction(data));
        navigate('/');

    }




    const getFavoriteData = () => {
        fetch(`${BASE_URL}/forecasts/v1/daily/1day/${CityData.cityKey}?apikey=${API_KEY}&metric=${metric}&details=true`)
            .then(res => res.json())
            .then(data => {
                setFavoriteData(data);
            })
            .catch(e => {
                handleOpenSnack(e, 'error');
                setFailedToLoad(true);
            })
    }

    const handleOpenSnack = (e, type) => {
        enqueueSnackbar(`${e.message} current weather at ${CityData.city}`, { variant: 'error' });
    }

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <div onClick={() => handleSelectFavorite({ city: CityData.city, country: CityData.country, cityKey: CityData.cityKey })} className='cursor-pointer bg-secondaryBG flex flex-col items-center justify-center p-4 rounded-xl text-2xl gap-5 h-1/2 lg:w-1/5'>
            {favoriteData ? (
                <>
                    <p>{CityData.city}, {CityData.country}</p>
                    <div className='flex flex-col gap-2'>
                        <WeatherIconHelper number={favoriteData.DailyForecasts[0].Day.Icon} size={3} />
                        <p>{favoriteData.DailyForecasts[0].Temperature.Maximum.Value}° {favoriteData.DailyForecasts[0].Temperature.Maximum.Unit} - {favoriteData.DailyForecasts[0].Temperature.Minimum.Value}° {favoriteData.DailyForecasts[0].Temperature.Minimum.Unit}</p>
                    </div>
                    <p>{favoriteData.DailyForecasts[0].Day.IconPhrase}</p>
                </>
            ) : <div>
                {failedToLoad ?
                    <div>
                        <p>Failed to load</p>
                        <p>{CityData.city}</p>
                    </div> :
                    <p>Loading...</p>}
            </div>}
            <Snackbar
                autoHideDuration={6000}
                TransitionComponent={SlideTransition}
                key={'testSnack'}
            />
        </div>
    )
}

export default Favorite