export const FETCH_WEATHER_START = 'FETCH_WEATHER_START';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const fetchWeatherStart = (taskId) => ({
  type: FETCH_WEATHER_START,
  payload: { taskId }
});

export const fetchWeatherSuccess = (taskId, data) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: { taskId, data }
});

export const fetchWeatherFailure = (taskId, error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: { taskId, error }
});

export const fetchWeather = (location, taskId) => {
  return async (dispatch) => {
    dispatch(fetchWeatherStart(taskId));
    
    try {
      // OpenWeatherMap API is used as an example
      // You'll need to sign up for an API key at openweathermap.org
      const API_KEY = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available for this location');
      }
      
      const data = await response.json();
      
      const weatherData = {
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
      };
      
      dispatch(fetchWeatherSuccess(taskId, weatherData));
    } catch (error) {
      dispatch(fetchWeatherFailure(taskId, error.message));
    }
  };
};