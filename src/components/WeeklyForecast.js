import React from 'react'

const WeeklyForecast = () => {

    const getForecastWeather = (cityKey) => {
        fetch(`${BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=${metric}&details=true`)
            .then(res => res.json())
            .then(data => {
                console.log('Forecast', data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div>WeeklyForecast</div>
    )
}

export default WeeklyForecast