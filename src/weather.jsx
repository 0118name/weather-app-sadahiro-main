import { useState, useEffect } from 'react';
import { fetchData } from './fetchData';
import { twMerge } from 'tailwind-merge';

export default function Weather() {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cityNumber, setCityNumber] = useState(0);

  const data = fetchData(
    `https://weather.tsukumijima.net/api/forecast/city/${cityNumber}`
  );
  useEffect(() => {
    if (cityNumber !== 0) {
      data
        .then((res) => {
          setWeather(res);
          setIsLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cityNumber]);

  const getCity = (cityNumber) => {
    switch (cityNumber) {
      case '011000':
        return 'bg-011000';
      case '040010':
        return 'bg-040010';
      case '130010':
        return 'bg-130010';
      case '471010':
        return 'bg-471010';
      default:
        return '';
    }
  };

  const bgcityNumber = getCity(cityNumber);

  if (isLoading) {
    return (
      <main className="min-h-screen w-screen grid items-center justify-items-center">
        <div className="shadow-2xl w-1/2 h-3/4 grid items-center justify-items-center rounded-2xl">
          <div className="w-full">
            <select
              className="w-1/2 mx-auto block p-2 rounded-md"
              onChange={(e) => {
                setCityNumber(e.target.value);
              }}>
              <option value="0">
                都道府県を選択してください
              </option>
              <option value="011000">北海道</option>
              <option value="040010">仙台</option>
              <option value="130010">東京</option>
              <option value="471010">沖縄</option>
            </select>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen w-screen grid items-center justify-items-center bg-cover bg-center bg-no-repeat ${bgcityNumber}`}>
      <div className="shadow-2xl bg-white w-1/2 h-3/4 grid items-center justify-items-center rounded-2xl">
        <div className="w-full">
          <select
            className="w-1/2 mx-auto block p-2 rounded-md mb-10"
            onChange={(e) => {
              setCityNumber(e.target.value);
            }}>
            <option value="0">
              都道府県を選択してください
            </option>
            <option value="011000">北海道</option>
            <option value="040010">仙台</option>
            <option value="130010">東京</option>
            <option value="471010">沖縄</option>
          </select>
          <h1 className="font-bold text-4xl text-center">
            {weather.location.prefecture}
          </h1>
          {weather.forecasts.map((forecast, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 items-center justify-items-center w-full px-5 mt-5">
                <div>
                  <h2 className="font-bold text-xl">
                    {forecast.date}
                  </h2>
                  <p className="text-center mt-2">
                    {forecast.telop}
                  </p>
                  <p className="text-center mt-2">
                    最高気温
                    {forecast.temperature.max?.celsius}℃
                  </p>
                  <p className="text-center">
                    最低気温
                    {forecast.temperature.min?.celsius}℃
                  </p>
                </div>
                <img
                  src={forecast.image.url}
                  alt={forecast.image.title}
                  width="100"
                  height="100"
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
