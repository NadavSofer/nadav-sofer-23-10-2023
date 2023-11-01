import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cityData: {
        city: 'Tel Aviv',
        country: 'Israel',
        cityKey: 215854,
    },
    loading: false,
    error: null,
    metric: true,
    sunHours: null,
    tempRange:null,
};

export const weatherSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setSunHours: (state, action) => {
            state.sunHours = action.payload;
        },
        setTempRange: (state, action) => {
            state.tempRange = action.payload;
        },
        setWeatherIcon: (state, action) => {
            state.weatherIcon = action.payload;
        },
        setCityData: (state, action) => {
            state.cityData = action.payload;
        },

    },
});

// Action creators are generated for each case reducer function
export const {
    setSunHours, setTempRange, setWeatherIcon, setCityData
} = weatherSlice.actions;

export default weatherSlice.reducer;
