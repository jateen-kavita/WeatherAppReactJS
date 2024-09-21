import React, { useEffect, useState, useRef } from "react";
import "./weather.css";
import searchIcon from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    const api_key = "2cb34c2e2074e8f1a766f6be2bf9c7f9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    try {
      const data = await axios.get(url);
      console.log(data.data);
      const icons = allIcons[data.data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.data.main.humidity,
        windSpeed: data.data.wind.speed,
        temperature: Math.floor(data.data.main.temp),
        location: data.data.name,
        icon: icons,
      });
      inputRef.current.value = "";
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    search("Mumbai");
  }, []);

  return (
    <div className="weather">
      <div className="searchBar">
        <input type="text" ref={inputRef} placeholder="Enter city name" />
        <img
          src={searchIcon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={weatherData.icon} alt="" className="weatherIcon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="city">{weatherData.location}</p>
      <div className="weatherData">
        <div className="col">
          <img src={humidity} alt="" />
          <div className="">
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" />
          <div className="">
            <p>{weatherData.windSpeed}Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
