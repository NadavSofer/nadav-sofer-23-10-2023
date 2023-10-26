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
    weatherIcon: null,
};

export const weatherSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setSunHours: (state, action) => {
            state.sunHours = action.payload;
        },
        setTempRange: (state, action) => {
            state.tempRange = action.payload;
        },
        setWeatherIcon: (state, action) => {
            state.weatherIcon = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setSunHours, setTempRange, setWeatherIcon
} = weatherSlice.actions;

export default weatherSlice.reducer;
