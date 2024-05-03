import { weatherImages } from "../constants";

const { View, Image, Text } = require("react-native");

function WeatherItem({ data }) {
  const getDayOfWeek = (date) => {
    var date = new Date(date);
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayOfWeek[date.getDay()];
  };

  return (
    <View className="flex pt-4 items-center rounded-3xl bg-slate-800 w-28 h-36 overflow-hidden ml-4">
      <Image
        source={
          weatherImages[data?.day?.condition?.text] ?? weatherImages["other"]
        }
        style={{ width: 50, height: 50 }}
      />
      <Text className="text-gray-400 mt-1 mb-1 text-base">
        {getDayOfWeek(data?.date)}
      </Text>
      <Text className="text-white text-2xl font-medium">
        {data?.day?.avgtemp_c}°
      </Text>
    </View>
  );
}

export default WeatherItem;
