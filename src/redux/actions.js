import { setData, setSunHours, fetchDataStart, fetchDataSuccess, fetchDataFailure, setTempRange, setWeatherIcon, setCityData} from "./weatherSlice";

// export const fetchEvents = () => async (dispatch) => {
//     dispatch(fetchDataStart());
//     try {
//         const result = await getEvents();
//         dispatch(fetchDataSuccess(result.data));
//     } catch (error) {
//         dispatch(fetchDataFailure(error.message));
//     }
// };

export const setSunHoursAction = (hours) => async (dispatch) => {
    try {
        dispatch(setSunHours(hours))
    } catch (error) {
        
    }
}

export const setTempRangeAction = (range) => async (dispatch) => {
    try {
        dispatch(setTempRange(range))
    } catch (error) {
        
    }
}

export const setWeatherIconAction = (number) => async (dispatch) => {
    try {
        dispatch(setWeatherIcon(number))
    } catch (error) {
        
    }
}

export const setCityDataAction = (number) => async (dispatch) => {
    try {
        dispatch(setCityData(number))
    } catch (error) {
        
    }
}