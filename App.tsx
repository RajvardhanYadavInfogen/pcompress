import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screens/Home";
import AppNavigator from "./app/navigation/AppNavigator";

interface Props {}
const App: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: 'red',
  },
});

export default App;
