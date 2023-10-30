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
                <img className={`invert`} style={{width:`${props.size}rem`}} src={sunnyCloud} alt='sunnyCloud'/>
            ) : props.number === 7 || props.number === 8 ? (
                <img className={`invert`} style={{width:`${props.size}rem`}} src={cloud} alt='cloud'/>
            ) : props.number === 11 ? (
                <img className={`invert`} style={{width:`${props.size}rem`}} src={fog} alt='fog'/>
            ) :  props.number === 12 || props.number === 13 || props.number === 14 || props.number === 18 ? (
                <img className={`invert`} style={{width:`${props.size}rem`}} src={rain} alt='rain'/>
            ) :  props.number === 15 || props.number === 16 || props.number === 17  ? (
                <img className={`invert`} style={{width:`${props.size}rem`}} src={thunder} alt='thunder'/>
            ) :  props.number === 19 || props.number === 22 ? (
                <img className={`invert`} style={{width:`${props.size}rem`}} src={snow} alt='snow'/>
            ) :  props.number === 20 || props.number === 21 || props.number === 23 ? (
                <img className={`invert`} style={{width:`${props.size}rem`}} src={sunnySnow} alt='sunnySnow'/>
            ) :  props.number === 24 ? (
                <img className={`invert`} style={{width:`${props.size}rem`}} src={ice} alt=''/>
            ) :  props.number === 25 || props.number === 26 || props.number === 29 ? (
                <img className={`invert`} style={{width:`${props.size}rem`}} src={sleet} alt='sleet'/>
            ) : <img className={`invert`} style={{width:`${props.size}rem`}} src={sunny} alt='sunny'/>}
        </div>
    )
}

export default WeatherIconHelper