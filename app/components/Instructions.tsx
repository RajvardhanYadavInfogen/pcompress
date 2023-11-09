import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Instructions() {
  return (
    <View style={{ position: "absolute", top: 30 }}>
      <Text style={{ fontWeight: "700", fontSize: 25, color: "black" }}>
        COMPIC
      </Text>
      <Text style={styles.instructions}>
        1. Select an Image : Tap the "Select Image" button to choose the image
        you want to compress from your photo gallery or camera.
      </Text>

      <Text style={styles.instructions}>
        2. Save : After compression is complete, you can save the compressed
        image to your device.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  instructions: {
    margin: 4,
    fontSize: 15,
    color: "black",
  },
});
