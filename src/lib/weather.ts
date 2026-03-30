const API_KEY = "465b79ffab6eb92ff3510037e5087f2a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: { temp: number; feels_like: number; humidity: number; temp_min: number; temp_max: number };
  weather: { description: string; icon: string; main: string }[];
  wind: { speed: number };
  visibility: number;
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
