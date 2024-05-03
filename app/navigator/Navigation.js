import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";

const stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
