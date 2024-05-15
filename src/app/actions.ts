"use server"

import { redirect } from "next/navigation"


export async function search(formData: FormData){
    const city = formData.get('city')
    if(!city) redirect('/')
    redirect(`/?city=${city}`)
}


export async function getWeather(city: string){

    try {
        // const cityName = formData.get('city')
        if(!city) city = 'chandigarh'
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
        const coordinates = await response.json()
        const {name, latitude, longitude} = coordinates.results[0]

        const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain,weather_code&timezone=auto&hourly=temperature_2m,weather_code&forecast_days=7&daily=temperature_2m_max,temperature_2m_min,weather_code`)
        const weather = await result.json()

        const forecast = []
        const hourlyData = [];
        const indices = [3, 6, 9, 12, 15, 18, 21]

        for (let i = 1; i < indices.length; i++) {
            const index = indices[i]
            hourlyData.push({ time: new Date(weather.hourly.time[index]).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) , temperature: weather.hourly.temperature_2m[index], weatherCode: weather.hourly.weather_code[index] });
        }


        for(let i = 0; i < weather.daily.time.length; i++){
            forecast.push({
                day: new Date(weather.daily.time[i]).toLocaleDateString('en-US', { weekday: 'long' }),
                maxTemp: weather.daily.temperature_2m_max[i],
                minTemp: weather.daily.temperature_2m_min[i],
                weatherCode: weather.daily.weather_code[i],
                // weatherCode: weather.daily.weather_code[i],
                // rain: weather.daily.rain[i],
                // precipitation: weather.daily.precipitation[i]
            })
        }
        
        weather.hourly = hourlyData
        weather.daily = forecast

        weather.cityName = name

        return {success: true, data: weather}
        
    } catch (error) {
        return {success: false, message: 'Something went wrong!'}
    }
    
}