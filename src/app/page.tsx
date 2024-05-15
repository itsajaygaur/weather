import Sidemenu from "@/components/sidemenu";
import styles from "./page.module.scss";
import { getWeather, search } from "./actions";
import { redirect } from "next/navigation";
import Search from "@/components/search";
import Image from "next/image";
// import data from './data.json'
import { weatherIconByCode } from "@/constants/data";
import { getWeatherDescription, getWeatherIcon } from "./lib/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: { city: string };
}) {
  const data = await getWeather(searchParams.city);
  if (!data.success) return <p>Something went wrong!</p>;
  const weather = data?.data;

  return (
    <>
      <div className={styles["weather"]}>
        {/* <form action={search}>
            <input name='city' type="text" className={styles['search-input']} placeholder='search for cities' />
          </form> */}
        <Search />

        <div className={styles["weather-info"]}>
          <div>
            <h2> {weather.cityName} </h2>
            <h3>
              {weather.current.temperature_2m}
              {weather.current_units.temperature_2m}
            </h3>
          </div>
          <Image
            className="weather-icon"
            src={getWeatherIcon(weather.current.weather_code)}
            width={150}
            height={150}
            alt="weather icon"
            unoptimized
          />
        </div>

        <div className={styles["today-forecast"]}>
          <p className={styles["forecast-heading"]}>TODAY'S FORECAST</p>
          <div className={styles["today-forecast-wrapper"]}>
            {weather.hourly.map(
              (
                item: {
                  time: string;
                  temperature: string;
                  weatherCode: string;
                },
                index: number
              ) => {
                return (
                  <div key={index}>
                    <p className={styles.time}> {item.time}</p>
                    <Image
                      className="weather-icon"
                      src={getWeatherIcon(item.weatherCode)}
                      width={100}
                      height={100}
                      alt="weather icon"
                      unoptimized
                    />
                    <p className={styles.temperature}>
                      {" "}
                      {item.temperature} {weather.current_units.temperature_2m}{" "}
                    </p>
                  </div>
                );
              }
            )}
          </div>
          <div></div>
        </div>
      </div>

      <div className={styles["week-forecast"]}>
        <p className={styles["forecast-heading"]}>WEEKLY FORECAST</p>
        <div className={styles["week-forecast-wrapper"]}>
          {weather.daily.map(
            (
              item: {
                day: string;
                minTemp: number;
                maxTemp: number;
                weatherCode: string;
              },
              index: number
            ) => {
              return (
                <div key={index} className={styles["week-forecast-info"]}>
                  <p className={styles.time}>
                    {" "}
                    {index === 0 ? "Today" : item.day}
                  </p>
                  <div>
                    <Image
                      className="weather-icon"
                      src={getWeatherIcon(item.weatherCode)}
                      width={70}
                      height={70}
                      alt="weather icon"
                      unoptimized
                    />
                    <p className={styles["weather-description"]}>
                      {getWeatherDescription(item.weatherCode)}
                    </p>
                  </div>
                  <p className={styles.temperature}>
                    <span className={styles["max-temp"]}>
                      {Math.floor(item.maxTemp)}
                    </span>
                    /
                    <span className={styles["min-temp"]}>
                      {Math.floor(item.minTemp)}
                    </span>
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
