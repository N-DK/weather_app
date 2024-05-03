import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { HEIGH, WIDTH, weatherImages } from "../constants";
import WeatherItem from "../components/WeatherItem";
import { useEffect, useState } from "react";
import { fetchForecast, fetchSearch } from "../api";
import Loading from "../components/Loading";

function HomeScreen() {
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const getForecast = async (params) => {
    setLoading(true);
    const data = await fetchForecast(params);
    setData(data);
    setLoading(false);
  };

  const handleSubmit = (city) => {
    getForecast({
      city,
      days: 7,
    });
    setCity("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchSearch(city);
      setLocations(data);
    };
    fetch();
  }, [city]);

  useEffect(() => {
    getForecast({
      city: "Ho Chi Minh",
      days: 7,
    });
  }, []);

  return (
    <View className="flex-1 bg-slate-700 pt-12">
      <SafeAreaView className="pr-3 pl-3">
        <View className=" relative z-50 flex flex-row items-center justify-between rounded-full bg-slate-500 p-1">
          <TextInput
            className="flex-1 pl-5 text-white"
            placeholderTextColor="white"
            placeholder="Search city"
            selectionColor="white"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <TouchableOpacity
            onPress={() => handleSubmit(city)}
            className="w-12 h-12 flex items-center justify-center bg-slate-600 rounded-full"
          >
            <MagnifyingGlassIcon size={28} color="white" />
          </TouchableOpacity>
          {locations?.length > 1 && city.trim() != "" && (
            <View className="absolute bg-white right-0 left-0 top-full rounded-3xl mt-4 pl-5">
              {locations?.map((loc, index) => (
                <TouchableOpacity key={index} onPress={() => handleSubmit(loc.name)} className="flex flex-row items-center h-10">
                  <MapPinIcon size={24} color="gray" />
                  <Text className="text-base ml-3">{loc.name}, {loc.country}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <View className="mt-5">
              <Text className="font-semibold text-white text-center text-2xl">
                {data?.location?.name},{" "}
                <Text className="text-white text-lg">
                  {data?.location?.country}
                </Text>
              </Text>
              <View className="flex items-center justify-center flex-row mt-5 mb-5">
                <Image
                  source={
                    weatherImages[data?.current?.condition?.text] ??
                    weatherImages["other"]
                  }
                  style={{ width: WIDTH * 0.5, height: HEIGH * 0.24 }}
                />
              </View>
              <Text className="text-center text-7xl text-white font-medium ml-7 mb-1">
                {data?.current?.temp_c}°
              </Text>
              <Text className="text-center text-white text-2xl">
                {data?.current?.condition?.text}
              </Text>
              <View className="flex flex-row justify-around items-center mt-6">
                <View className="flex flex-row items-center">
                  <Image
                    source={require("../assets/icons/wind.png")}
                    style={{ width: 28, height: 28 }}
                  />
                  <Text className="text-white ml-2 text-base font-medium">
                    {data?.current?.wind_kph}km
                  </Text>
                </View>
                <View className="flex flex-row items-center">
                  <Image
                    source={require("../assets/icons/drop.png")}
                    style={{ width: 28, height: 28 }}
                  />
                  <Text className="text-white ml-2 text-base font-medium">
                    {data?.current?.humidity}%
                  </Text>
                </View>
                <View className="flex flex-row items-center">
                  <Image
                    source={require("../assets/icons/sun.png")}
                    style={{ width: 28, height: 28 }}
                  />
                  <Text className="text-white ml-2 text-base font-medium">
                    {data?.forecast?.forecastday[0]?.astro.sunrise}
                  </Text>
                </View>
              </View>
            </View>
            <View className="mt-6">
              <View className="flex flex-row items-center ml-1">
                <CalendarDaysIcon size={24} color="white" />
                <Text className="text-white ml-2 text-base">
                  Daily forecast
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View className="flex flex-row items-center mt-4 -ml-4">
                  {data?.forecast?.forecastday?.map((fore, index) => (
                    <WeatherItem key={index} data={fore} />
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
export default HomeScreen;
