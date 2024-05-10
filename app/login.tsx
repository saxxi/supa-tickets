import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import TextInput from "@/components/form/TextInput";
import { useState } from "react";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

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
      <View>
        <TextInput
          value={emailAddress}
          label="Email"
          onChangeText={setEmailAddress}
        />
        <TextInput
          value={password}
          label="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <Button label="Sign in" onPress={onSignInPress} />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.gray,
          }}
        />
        <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.gray,
          }}
        />
      </View>

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
