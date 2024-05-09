import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import Button from "../Button";
import ImageViewer from "./ImageViewer";

interface InputFieldProps {
  label: string;
}

export default function ImagePicker({ label }: InputFieldProps) {
  const [selectedImage, setSelectedImage] = useState<string>();

  const pickImageAsync = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 1],
    });

    if (!result.canceled) {
      console.log(result.assets[0]);

      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.inputForm}>
      <ImageViewer imageURI={selectedImage} />
      <Button label={label} outline={true} onPress={pickImageAsync} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputForm: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: "red",
    marginTop: 5,
  },
});
