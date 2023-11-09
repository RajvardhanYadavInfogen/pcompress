import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { Image } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from "@react-navigation/native";
import ImageResizer from "react-native-image-resizer";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { Alert } from "react-native";

export default function ImageEditor({ route }: any) {
  const { Uri, Size } = route.params;
  const navigation = useNavigation<any>();
  const [newPic, setNewPic] = useState<string>("");
  const [sliderVal, setSliderVal] = useState<number>(0);
  const [newSize, SetNewSize] = useState<number>();
  const [size, SetSize] = useState<number>(Size / 1024);

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  const onClickAnother = async () => {
    try {
      const { path, size } = await ImagePicker.openCamera({
        width: 413,
        height: 531,
        cropping: true,
      });
      console.log("size", size);
      setNewPic(path);
      SetSize(size);
    } catch (err) {
      console.log(err);
    }
  };

  const onPickAnother = async () => {
    try {
      const { path, size } = await ImagePicker.openPicker({
        width: 413,
        height: 531,
        cropping: true,
      });
      console.log("size", size / 1024);
      setNewPic(path);
      SetSize(size);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavePress = async () => {
    const imageURI = newPic || Uri;

    CameraRoll.save(imageURI)
      .then((result) => {
        Alert.alert("Image saved to gallery");
      })
      .catch((error) => {
        console.error("Error saving image to camera roll:", error);
      });
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  };

  const handleCompress = async () => {
    console.log(newPic);
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        newPic || Uri,
        413,
        531,
        "JPEG",
        sliderVal * 100
      );

      console.log("Resized size", resizedImage.size / 1024, "kb");

      setNewPic(resizedImage.uri);
      SetNewSize(resizedImage.size / 1024);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/background.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require("../images/back.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSavePress}>
          <Image
            source={require("../images/save.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.passportImg}>
          <Image
            source={{ uri: newPic || Uri }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.slider}>
          <TouchableOpacity style={styles.sliderBtn} onPress={onClickAnother}>
            <Text style={{ fontSize: 15, color: "white" }}>Click Another</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sliderBtn} onPress={onPickAnother}>
            <Text style={{ fontSize: 15, color: "white" }}>Pick Another</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 15, color: "black" }}>
            Size: {size.toFixed(2)} kb
          </Text>
          <Text style={{ fontWeight: "700", fontSize: 15, color: "black" }}>
            compressed to: {newSize?.toFixed(2)} kb
          </Text>
        </View>
        <Slider
          style={{ width: "90%", height: 60 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="black"
          maximumTrackTintColor="black"
          onValueChange={(val) => setSliderVal(val)}
        />
        <Button title="compress" onPress={handleCompress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    // zIndex:2
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: -1,
    opacity: 0.1,
  },
  passportImg: {
    elevation: 15,
    padding: 10,
    height: 265,
    width: 206,
    backgroundColor: "white",
  },
  slider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderBtn: {
    backgroundColor: "#454545",
    borderRadius: 4,
    padding: 5,
  },
  footer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 15,
    elevation: 15,
  },
});
