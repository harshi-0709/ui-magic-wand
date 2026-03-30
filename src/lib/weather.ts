const API_KEY = "465b79ffab6eb92ff3510037e5087f2a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: { temp: number; feels_like: number; humidity: number; temp_min: number; temp_max: number };
  weather: { description: string; icon: string; main: string }[];
  wind: { speed: number };
  visibility: number;
  timezone: number; // offset in seconds from UTC
}

export function isNightTime(data: WeatherData): boolean {
  const nowUtc = Math.floor(Date.now() / 1000);
  const localNow = nowUtc + data.timezone;
  const localSunrise = data.sys.sunrise + data.timezone;
  const localSunset = data.sys.sunset + data.timezone;
  return localNow < localSunrise || localNow > localSunset;
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error("Location not found");
  return res.json();
}
