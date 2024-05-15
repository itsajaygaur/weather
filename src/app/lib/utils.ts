import { weatherIconByCode } from '@/constants/data';

export function getWeatherIcon(weatherCode: string){
    const icon = weatherIconByCode[weatherCode]?.day.image
    if(icon) return icon
    return "https://placehold.co/600x400?text=:("
}

export function getWeatherDescription(weatherCode: string){
    const description = weatherIconByCode[weatherCode].day.description
    if(description) return description
    return "No description"
}