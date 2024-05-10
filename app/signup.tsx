import TextInput from "@/components/form/TextInput";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
const Page = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Sign up to get your tickets
        </Text>

        <Link href={"/login"} replace asChild>
          <Text style={defaultStyles.textLink}>
            Already have an account? Log in
          </Text>
        </Link>

        {pendingVerification && (
          <View style={styles.inputContainer}>
            <TextInput
              value={code}
              label="Your email code"
              onChangeText={setCode}
            />
          </View>
        )}

        {!pendingVerification && (
          <View style={styles.inputContainer}>
            <TextInput
              value={firstName}
              label="First Name"
              onChangeText={setFirstName}
            />
            <TextInput
              value={lastName}
              label="Last Name"
              onChangeText={setLastName}
            />
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
          </View>
        )}

        <View style={{ flex: 1 }} />

        {pendingVerification && (
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              styles.enabled,
              { marginBottom: 20 },
            ]}
            onPress={onPressVerify}
          >
            <Text style={defaultStyles.buttonText}>Verify</Text>
          </TouchableOpacity>
        )}

        {!pendingVerification && (
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              styles.enabled,
              { marginBottom: 20 },
            ]}
            onPress={onSignUpPress}
          >
            <Text style={defaultStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 60,
    gap: 20,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default Page;
