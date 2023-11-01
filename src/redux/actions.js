import { setSunHours, setTempRange, setWeatherIcon, setCityData} from "./weatherSlice";

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