import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city || typeof city !== "string") {
    return res.status(400).json({ message: "City is required." });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      return res.status(response.status).json({ message: "City not found or API error." });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
}