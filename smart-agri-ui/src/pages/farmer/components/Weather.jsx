import React, { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("Rajkot");

  const [forecast, setForecast] = useState(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  const API_KEY = "4e50762c6b7dd92307eb4dcf8ce24dec"; // (आपने दिया था)

  const fetchDailyForecast = async (lat, lon) => {
    setForecastLoading(true);
    try {
      let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=${API_KEY}`;
      let res = await fetch(url);
      if (!res.ok) {
        url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=${API_KEY}`;
        res = await fetch(url);
      }
      const data = await res.json();
      if (data.daily) setForecast(data.daily.slice(0, 7));
      else setForecast(null);
    } catch (e) {
      console.error("Forecast error:", e);
      setForecast(null);
    } finally {
      setForecastLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(cityName);
        if (data.coord) {
          fetchDailyForecast(data.coord.lat, data.coord.lon);
        }
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (err) {
      console.error("Weather error:", err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(data.name);
        if (data.coord) {
          fetchDailyForecast(data.coord.lat, data.coord.lon);
        }
      } else {
        setWeather(null);
      }
    } catch (err) {
      console.error("Coords weather error:", err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // tab open पर auto-detect
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => fetchWeatherByCity("Rajkot")
      );
    } else {
      fetchWeatherByCity("Rajkot");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="card card-pad">
      <h3 style={{ marginBottom: 10 }}>🌦️ Live Weather</h3>

      {/* Controls */}
      <div style={{ marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Enter city..."
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button className="btn btn-green" onClick={() => fetchWeatherByCity(inputCity)}>
          Find Weather
        </button>
        <button
          className="btn"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  const { latitude, longitude } = pos.coords;
                  fetchWeatherByCoords(latitude, longitude);
                },
                () => fetchWeatherByCity("Rajkot")
              );
            } else {
              fetchWeatherByCity("Rajkot");
            }
          }}
        >
          Use GPS
        </button>
      </div>

      {loading ? (
        <p>Loading weather...</p>
      ) : weather ? (
        <>
          <div className="weather-box">
            <h3>{weather.name || city}</h3>
            <p>
              {weather.weather?.[0]?.main} ({weather.weather?.[0]?.description})
            </p>
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p>
              Humidity: {weather.main.humidity}% • Wind: {weather.wind.speed} m/s
            </p>
          </div>

          <div style={{ marginTop: 16 }}>
            <h4 style={{ marginBottom: 10 }}>📅 7-Day Forecast</h4>
            {forecastLoading ? (
              <p>Loading forecast...</p>
            ) : forecast ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                {forecast.map((d, i) => {
                  const dateStr = new Date(d.dt * 1000).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  });
                  const icon = d.weather?.[0]?.icon;
                  return (
                    <div key={i} className="card" style={{ padding: 12, textAlign: "center" }}>
                      <div style={{ fontWeight: 600 }}>{dateStr}</div>
                      {icon && (
                        <img
                          alt="icon"
                          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                          style={{ width: 60, height: 60, margin: "4px auto" }}
                        />
                      )}
                      <div style={{ fontSize: 18 }}>
                        {Math.round(d.temp.max)}° / {Math.round(d.temp.min)}°C
                      </div>
                      <div className="text-muted" style={{ fontSize: 12 }}>
                        {d.weather?.[0]?.description}
                      </div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>
                        💧 {Math.round((d.pop ?? 0) * 100)}% • 💨 {Math.round(d.wind_speed)} m/s
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted">Forecast not available.</p>
            )}
          </div>
        </>
      ) : (
        <p>No weather data available.</p>
      )}
    </section>
  );
}
