import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ImageEditor from "../screens/ImageEditor";

const AppNavigator = () => {
  type RootstackParamList = {
    Home: undefined;
    ImageEditor: { imageUri: string };
  };
  const Stack = createNativeStackNavigator<RootstackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="ImageEditor"
          component={ImageEditor}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
