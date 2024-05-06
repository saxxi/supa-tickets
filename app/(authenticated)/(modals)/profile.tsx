import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import { useForm, Controller } from "react-hook-form";
import { Stack } from "expo-router";

import { View } from "@/components/Themed";
import Button from "@/components/Button";
import TextInput from "@/components/form/TextInput";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function Profile() {
  const { user } = useUser();
  const { signOut, isSignedIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const userName = user?.fullName || user?.primaryEmailAddress?.toString();

  const title =
    user?.firstName || user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : "Profile";

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      console.log("Submitted data:", data);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title }} />

      <View style={styles.container}>
        <SignedIn>
          <View style={{ gap: 10 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="First Name"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.firstName}
                />
              )}
              name="firstName"
              rules={{ required: true }}
              defaultValue={user?.firstName || ""}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Last Name"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.lastName}
                />
              )}
              name="lastName"
              rules={{ required: true }}
              defaultValue={user?.lastName || ""}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.email}
                  disabled={true}
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue={user?.primaryEmailAddress?.toString() || ""}
            />
            <Button
              label={loading ? "Saving..." : "Save"}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            />
            <Button label="Log out" outline={true} onPress={() => signOut()} />
          </View>
        </SignedIn>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});
