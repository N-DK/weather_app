import { View } from "react-native";
import * as Progress from "react-native-progress";
import { HEIGH, WIDTH } from "../constants";

function Loading() {
  return (
    <View style={{width: WIDTH, height: HEIGH}} className="absolute flex items-center justify-center">
      <Progress.CircleSnail thickness={10} size={120} color='rgb(15, 23, 42)'/>
    </View>
  );
}

export default Loading;
