import React from 'react';
import sunny from '../assets/sunny.svg';
import sunnyCloud from '../assets/sunnyCloud.svg';
import cloud from '../assets/cloud.svg';
import rain from '../assets/rain.svg';
import fog from '../assets/fog.svg';
import thunder from '../assets/thunder.svg';
import snow from '../assets/snow.svg';
import sunnySnow from '../assets/sunnySnow.svg';
import ice from '../assets/ice.svg';
import sleet from '../assets/sleet.svg';


const WeatherIconHelper = (props) => {
    return (
        <div className='flex justify-center'>
            {props.number === 2 || props.number === 3 || props.number === 4 || props.number === 5 || props.number === 6 ? (
                <img className={`invert w-${props.size}`} src={sunnyCloud}/>
            ) : props.number === 7 || props.number === 8 ? (
                <img className={`invert w-${props.size}`} src={cloud}/>
            ) : props.number === 11 ? (
                <img className={`invert w-${props.size}`} src={fog}/>
            ) :  props.number === 12 || props.number === 13 || props.number === 14 || props.number === 18 ? (
                <img className={`invert w-${props.size}`} src={rain}/>
            ) :  props.number === 15 || props.number === 16 || props.number === 17  ? (
                <img className={`invert w-${props.size}`} src={thunder}/>
            ) :  props.number === 19 || props.number === 22 ? (
                <img className={`invert w-${props.size}`} src={snow}/>
            ) :  props.number === 20 || props.number === 21 || props.number === 23 ? (
                <img className={`invert w-${props.size}`} src={sunnySnow}/>
            ) :  props.number === 24 ? (
                <img className={`invert w-${props.size}`} src={ice}/>
            ) :  props.number === 25 || props.number === 26 || props.number === 29 ? (
                <img className={`invert w-${props.size}`} src={ice}/>
            ) : <img className={`invert w-${props.size}`} src={sunny}/>}
        </div>
    )
}

export default WeatherIconHelper