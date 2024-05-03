import axios from "axios";
import { apiKey } from "../constants";

const forecast = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.city}&days=${params.days}&aqi=no&alerts=no`;
const search = (q) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${q}`;

const apiCall = async (url) => {
  const options = {
    method: "GET",
    url,
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchForecast = (pars) => {
  return apiCall(forecast(pars));
};
export const fetchSearch = (q) => {
  return apiCall(search(q));
};
