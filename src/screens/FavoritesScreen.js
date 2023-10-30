import React from 'react';
import useLocalStorage from '../helpers/storage';

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useLocalStorage('favorites', []);

    console.log(favorites);
    return (
        <div className='w-full h-fit lg:h-screen flex flex-col justify-center items-center pt-16 px-5'>
            <p>Favorites</p>
            {favorites.length !== 0 ? favorites.map((favorite, i) => (
                <div key={i}>
                    <p>{favorite.city}</p>
                </div>
            )) : (
                <div>
                    <p>You have no favorites</p>
                </div>
            )}
            <div>
                {/* Additional content */}
            </div>
        </div>
    )
}

export default FavoritesScreen