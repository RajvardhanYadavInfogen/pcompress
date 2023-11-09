import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Alert,
} from "react-native";
import React from "react";
import {
  requestCameraPermissions,
  requestGalleryPermissions,
} from "../utils/Helper";
import ImagePicker from "react-native-image-crop-picker";

export default function UploadButton() {
  const handleCamera = async () => {  //const { navigate } = this.props.navigation;
    try {
      
      await requestCameraPermissions(); //requesting for permission from utils/Helper.tsx

      const { path } = await ImagePicker.openCamera({
        width: 413,
        height: 531,
        cropping: true,
      });
      console.log(path);
      
      
      
    } catch (err) {
      console.log(err);
    }
    
  };

  const handleGallery = async () => {
    try {
      const permission = await requestGalleryPermissions(); //requesting for permission from utils/Helper.tsx
      if (permission === "granted") {
        const { path } = await ImagePicker.openPicker({
          width: 413,
          height: 531,
          cropping: true,
        });
        console.log(path);
      } else {
        Alert.alert("Grant Gallery Permissions");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ marginTop: 30 }}>
      <TouchableOpacity style={styles.touchable} onPress={handleCamera}>
        <Image
          source={require("../images/camera.png")}
          style={{ width: "70%", height: "70%", opacity: 0.7 }}
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: "700", textAlign: "center" }}>
        Pic from camera
      </Text>
      <TouchableOpacity style={styles.touchable} onPress={handleGallery}>
        <Image
          source={require("../images/gallery.png")}
          style={{ width: "70%", height: "70%", opacity: 0.7 }}
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: "700", textAlign: "center" }}>
        Upload from Gallery
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
