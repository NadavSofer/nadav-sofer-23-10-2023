import React, { useEffect, useState } from 'react';
import FavoriteData from '../components/favoriteJson.json';
import WeatherIconHelper from './WeatherIconHelper';
import { setCityDataAction } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Favorite = (props) => {
    
    const [favoriteData, setFavoriteData] = useState(props.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    useEffect(() => {
        getFavoriteData()
    }, []);

    const handleSelectFavorite = (data) => {
        dispatch(setCityDataAction(data));
        navigate('/');

    }


    const getFavoriteData = () => {
        console.log(FavoriteData.DailyForecasts[0].Day.Icon);

    }

    return (
            <div onClick={() => handleSelectFavorite({ city: favoriteData.city, country: favoriteData.country, cityKey: favoriteData.cityKey })} className='cursor-pointer bg-secondaryBG flex flex-col items-center justify-center p-4 rounded-xl text-2xl gap-5 h-1/2'>
                <p>{favoriteData.city}, {favoriteData.country}</p>
                <div className='flex flex-col gap-2'>
                    <WeatherIconHelper number={FavoriteData.DailyForecasts[0].Day.Icon} size={3} />
                    <p>{FavoriteData.DailyForecasts[0].Temperature.Maximum.Value}° {FavoriteData.DailyForecasts[0].Temperature.Maximum.Unit} - {FavoriteData.DailyForecasts[0].Temperature.Minimum.Value}° {FavoriteData.DailyForecasts[0].Temperature.Minimum.Unit}</p>
                </div>
                <p>{FavoriteData.DailyForecasts[0].Day.IconPhrase}</p>
            </div>
    )
}

export default Favorite