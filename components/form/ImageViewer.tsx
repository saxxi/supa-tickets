import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Colors from "@/constants/Colors";
import { hp, wp } from "@/constants/Dimensions";

type Props = {
  imageSource?: ImageSourcePropType;
  imageURI?: string;
};

export default function ImageViewer({ imageSource, imageURI }: Props) {
  if (!imageSource && !imageURI) {
    return (
      <View style={styles.container}>
        <Text style={styles.noImage}>(No image selected)</Text>
      </View>
    );
  }

  const image = imageURI ? { uri: imageURI } : imageSource;
  console.log(image);

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
  },
  noImage: {
    flex: 1,
    textAlign: "center",
    padding: 10,
    color: Colors.neutral(0.5),
  },
  image: {
    width: wp(30),
    height: hp(30),
  },
});
