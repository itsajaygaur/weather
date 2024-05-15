import Search from "@/components/search";
// import styles from '../page.module.scss'
import styles from './cities.module.scss'
import { getWeather } from "../actions";
import { getWeatherDescription, getWeatherIcon } from "../lib/utils";
import Image from "next/image";


export default async function Cities({searchParams}: {searchParams: {city: string}}){
        const data = await getWeather(searchParams.city)
        if(!data.success) return <p>Something went wrong!</p>
        const weather = data?.data


    return(
        <>
            <div className={styles['cities']} >
            <Search />
                <div className={styles['city-container']} >

                    <div className={styles['city-wrapper']} >
                        <div>
                            <Image className='weather-icon' src={getWeatherIcon(weather.current.weather_code)} width={120} height={120} alt="weather icon" unoptimized />
                            <h2>{weather.cityName}</h2>
                        </div>
                        <h3> {Math.floor(weather.current.temperature_2m)} {weather.current_units.temperature_2m} </h3>
                    </div>

                    {/* {
                        cities && cities.map((item, index) => (
                            <div key={index} className={styles['city-wrapper']} >
                                <p>{item.name}</p>
                            </div>
                        ) )
                    } */}
                </div>
            </div>

            <div className={styles['city-weather']}  >

                <div className={styles['weather-info']} >
                    <div>
                        <h2> {weather.cityName} </h2>
                        <h3> {weather.current.temperature_2m} {weather.current_units.temperature_2m} </h3>
                    </div>
                    <Image className='weather-icon' src={getWeatherIcon(weather.current.weather_code)} width={120} height={120} alt="weather icon" unoptimized />
                </div>

                <div className={styles['today-forecast']} >
                    <p className={styles['forecast-heading']} >TODAY'S FORECAST</p>
                    <div className={styles['today-forecast-wrapper']} >
                        {
                        weather.hourly.slice(0, 3).map((item: {time: string, temperature: string, weatherCode: string}, index: number) => {
                            return <div key={index} >
                            <p className={styles.time} > {item.time}</p>
                            <Image className='weather-icon' src={getWeatherIcon(item.weatherCode)} width={70} height={70} alt="weather icon" unoptimized />
                            <p className={styles.temperature} > {item.temperature} {weather.current_units.temperature_2m} </p>

                            </div> 
                        })
                        }
                    </div>
                    <div>

                    </div>
                </div>


                <div className={styles['threeday-forecast']} >
                    <p className={styles['forecast-heading']} >3-DAY FORECAST</p>
                    <div className={styles['threeday-forecast-wrapper']} >

                    {
                        weather.daily.slice(0, 3).map((item: {day: string, minTemp: number, maxTemp: number, weatherCode: string}, index: number) => {
                        return <div key={index} className={styles['threeday-forecast-info']} >
                            <p className={styles.time} >  { index === 0 ? 'Today': item.day}</p>
                            <div>
                                <Image className='weather-icon' src={getWeatherIcon(item.weatherCode)} width={70} height={70} alt="weather icon" unoptimized />
                                <p className={styles['weather-description']} >{getWeatherDescription(item.weatherCode)}</p>
                            </div>
                            <p className={styles.temperature} > <span className={styles['max-temp']} >{Math.floor(item.maxTemp)}</span>/<span className={styles['min-temp']} >{Math.floor(item.minTemp)}</span> </p>
                        </div>
                        })
                    }
                    </div>
                    </div>


            </div>
        </>
    )
}