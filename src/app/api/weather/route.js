// app/api/weather/route.js
export async function GET() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=${process.env.WEATHER_API_KEY}`
  );
  const data = await res.json();
  return Response.json(data);
}
