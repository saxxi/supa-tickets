import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={{ marginTop: 500, padding: 20, gap: 10 }}>
        <Text style={styles.header}>CONCERT TICKETING</Text>
        <Text style={styles.header}>But easy.</Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={"/login"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "#fff" },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 48,
    fontWeight: "900",
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});
export default Page;
