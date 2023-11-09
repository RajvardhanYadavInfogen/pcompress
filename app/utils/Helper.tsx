import { Alert, PermissionsAndroid } from "react-native";

export const requestCameraPermissions = async() => {
    try{ 
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'COMPIC App Camera Permission',
            message:
              'COMPIC App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log(granted)
        console.log(PermissionsAndroid.RESULTS)
        const {DENEID,NEVER_ASK_AGAIN}=PermissionsAndroid.RESULTS
        if(granted===DENEID){
          Alert.alert("App requires camera permissions")
        }
        if(granted===NEVER_ASK_AGAIN){
          Alert.alert("Kindly grant permission")
        }
    }catch(error){
      console.log(error)
    }
}

export const requestGalleryPermissions = async() => {
  let isGranted = ''
    try{ 
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'COMPIC App gallery Permission',
            message:
              'COMPIC App needs access to your gallery ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        isGranted=granted
        console.log(granted)
        console.log(PermissionsAndroid.RESULTS)
        const {DENEID,NEVER_ASK_AGAIN}=PermissionsAndroid.RESULTS
        if(granted===DENEID){
          Alert.alert("App requires camera permissions")
        }
        if(granted===NEVER_ASK_AGAIN){
          Alert.alert("Kindly grant permission")
        }
      
    }catch(error){
      console.log(error)
    }
    return isGranted
}

