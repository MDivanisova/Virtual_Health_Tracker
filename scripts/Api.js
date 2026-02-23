
import WEATHER_API_KEY from '../config.js';
//importirame go API klucot od poseben file 

export async function weather(city){ // asinhrona funkcija za vremeto 
 

    const weatherRes = await fetch( // prakja baranje do OpenWeatherMapp za vrmenski podatoci za gradot 
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    const weatherData = await weatherRes.json(); // go pretvarame odgovorot vo json objekt 
    if(weatherData.cod == 400){ // ako Api vrati greska vrakjame result bad
        return {
            "result": "Bad"
        }
    }
    return { // ako e uspesno vrakja objekt so dolnite informacii 
        "result": "Good",
        "temperature": weatherData.main.temp,
        "windSpeed": weatherData.wind.speed,
        "description": weatherData.weather[0].main
    }
}

