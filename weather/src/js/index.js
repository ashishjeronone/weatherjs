import { proxy, locationApiKey, demoAppId, demoAppCode } from './config';
import axios from 'axios';

async function getPlace(query) {
    try {
        const placeData = await axios(`${proxy}https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${locationApiKey}`);
        const commonPlace = placeData.data.results[0].geometry

        const weatherData = await axios(`${proxy}https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude=${commonPlace.lat}&longitude=${commonPlace.lng}&oneobservation=true&app_id=${demoAppId}&app_code=${demoAppCode}`)

        console.log(weatherData.data.observations.location[0])
        console.log(weatherData.data.observations.location[0].observation)
    } catch (err) {
        console.log(err)
    }
}




document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault()
    const value = document.querySelector('.input').value
    getPlace(value)
})