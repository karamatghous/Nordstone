import React, { useState, useEffect } from "react";
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from "react-native";
import storage from "@react-native-firebase/storage";
import firebase from "@react-native-firebase/auth";
import ImagePicker from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function PhotoScreen() {
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [filePath, setFilePath] = useState({});
  const [sampleImage, setSampleImage] = useState([]);

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log("Response = ", response);

        if (response.didCancel) {
          alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }
        console.log("base64 -> ", response.base64);
        console.log("uri -> ", response.uri);
        console.log("width -> ", response.width);
        console.log("height -> ", response.height);
        console.log("fileSize -> ", response.fileSize);
        console.log("type -> ", response.type);
        console.log("fileName -> ", response.fileName);
        setFilePath(response.assets[0]);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);
      setFilePath(response.assets[0]);
    });
  };

  const uploadImage = async () => {
    const { uri } = filePath;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    setUploading(true);
    setTransferred(0);
    const reference = storage().ref(`/myfiles/${filename}`);
    const task = reference.putFile(uploadUri);
    // set progress state
    task.on("state_changed", (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      "Photo uploaded!",
      "Your photo has been uploaded to Firebase Cloud Storage!"
    );
  };

  const getSampleImage = async () => {
    const imageRefs = await storage().ref("myfiles").listAll();
    const urls = await Promise.all(
      imageRefs.items.map((ref) => ref.getDownloadURL())
    );
    setSampleImage(urls);
  };
  useEffect(() => {
    getSampleImage();
  });

  console.log("listData" + sampleImage);
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={{ uri: filePath.uri }} style={styles.imageStyle} />
          <Text style={styles.textStyle}>{filePath.uri}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => captureImage("photo")}
          >
            <Text style={styles.textStyle}>Launch Camera for Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => chooseFile("photo")}
          >
            <Text style={styles.textStyle}>Choose Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => uploadImage()}
          >
            <Text style={styles.textStyle}>Upload Firebase</Text>
          </TouchableOpacity>
          <Text>Firebase Image </Text>
          {sampleImage.map((url) => {
            return (
              <View key={url} style={{ marginVertical: 5 }}>
                <Image
                  source={{ uri: url }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
    resizeMode: "contain",
  },
});
