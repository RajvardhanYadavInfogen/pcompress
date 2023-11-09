import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Switch,
} from "react-native";
import UploadButton from "../components/UploadButton";
import Instructions from "../components/Instructions";
import {
  requestCameraPermissions,
  requestGalleryPermissions,
} from "../utils/Helper";
import ImagePicker from "react-native-image-crop-picker";

const Home = ({ navigation }: { navigation: any }) => {
  const handleCamera = async () => {
    //const { navigate } = this.props.navigation;
    try {
      await requestCameraPermissions(); //requesting for permission from utils/Helper.tsx

      const { path, size } = await ImagePicker.openCamera({
        width: 413,
        height: 531,
        cropping: true,
      });
      console.log(path);
      navigation.navigate("ImageEditor", { Uri: path, Size: size });
    } catch (err) {
      console.log(err);
    }
  };

  const handleGallery = async () => {
    try {
      const permission = await requestGalleryPermissions(); //requesting for permission from utils/Helper.tsx
      if (permission === "granted") {
        const { path, size } = await ImagePicker.openPicker({
          width: 413,
          height: 531,
          cropping: true,
        });
        console.log(path);
        navigation.navigate("ImageEditor", { Uri: path, Size: size });
      } else {
        Alert.alert("Grant Gallery Permissions");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Instructions />
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity style={styles.touchable} onPress={handleCamera}>
          <Image
            source={require("../images/camera.png")}
            style={{ width: "70%", height: "70%", opacity: 0.7 }}
          />
        </TouchableOpacity>
        <Text
          style={{ fontWeight: "700", textAlign: "center", color: "black" }}
        >
          Pic from camera
        </Text>
        <TouchableOpacity style={styles.touchable} onPress={handleGallery}>
          <Image
            source={require("../images/gallery.png")}
            style={{ width: "70%", height: "70%", opacity: 0.7 }}
          />
        </TouchableOpacity>
        <Text
          style={{ fontWeight: "700", textAlign: "center", color: "black" }}
        >
          Upload from Gallery
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'blue',
  },
  touchable: {
    width: 120,
    height: 120,
    margin: 10,
    borderColor: "blue",
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
