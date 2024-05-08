import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <Button
          label="Continue with Phone"
          disabled={true}
          icon={({ color, size }) => (
            <Ionicons name="mail-outline" size={size} style={{ color }} />
          )}
          style={{ flex: 1 }}
        />
        <Button
          label="Continue with Apple"
          outline={true}
          disabled={true}
          icon={({ color, size }) => (
            <Ionicons name="logo-apple" size={size} style={{ color }} />
          )}
          style={{ flex: 1 }}
        />
        <Button
          label="Continue with Google"
          outline={true}
          onPress={() => onSelectAuth(Strategy.Google)}
          icon={({ color, size }) => (
            <Ionicons name="logo-google" size={size} style={{ color }} />
          )}
          style={{ flex: 1 }}
        />
        <Button
          label="Continue with Facebook"
          outline={true}
          disabled={true}
          onPress={() => onSelectAuth(Strategy.Facebook)}
          icon={({ color, size }) => (
            <Ionicons name="logo-facebook" size={size} style={{ color }} />
          )}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
});
