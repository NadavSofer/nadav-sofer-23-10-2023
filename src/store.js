import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './redux/weatherSlice';

export const store = configureStore({
    reducer: {
        weatherData: weatherSlice,
    },
})

export default store;