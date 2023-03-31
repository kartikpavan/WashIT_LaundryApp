import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               name="HomeScreen"
               component={HomeScreen}
               options={{ headerShown: false }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default StackNavigator;
