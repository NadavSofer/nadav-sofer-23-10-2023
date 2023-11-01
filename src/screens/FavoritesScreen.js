import React from 'react';
import useLocalStorage from '../helpers/storage';
import Favorite from '../components/Favorite';

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useLocalStorage('favorites', []);

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center pt-16 px-5'>
            <div className='w-4/5 h-fit md:h-1/5'>
                <p className='text-6xl border-b-2 pb-2'>Favorites</p>
            </div>
            <div className='h-3/5 w-4/5 flex flex-wrap gap-10 overflow-y-auto'>
                {favorites.length !== 0 ? favorites.map((favorite, i) => (
                        <Favorite key={i} data={favorite} />
                )) : (
                    <div>
                        <p className='text-3xl'>You have no favorites</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FavoritesScreen