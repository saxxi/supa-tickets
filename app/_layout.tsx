import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { UserInactivityProvider } from "@/context/UserInactivity";
import { View, ActivityIndicator, Pressable, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

function isWeb() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

const tokenCache = {
  async getToken(key: string) {
    try {
      if (isWeb()) {
        return localStorage.getItem(key);
      } else {
        return SecureStore.getItemAsync(key);
      }
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      if (isWeb()) {
        localStorage.setItem(key, value);
      } else {
        return SecureStore.setItemAsync(key, value);
      }
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(authenticated)/(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const colorScheme = useColorScheme();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <Pressable onPress={router.back}>
                <FontAwesome6
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="arrow-left"
                />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <Pressable onPress={router.back}>
                <FontAwesome6
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="arrow-left"
                />
              </Pressable>
            ),
            headerRight: () => (
              <Link href={"/help"} asChild>
                <Pressable>
                  <FontAwesome6
                    size={28}
                    style={{ marginBottom: -3 }}
                    name="circle-info"
                  />
                </Pressable>
              </Link>
            ),
          }}
        />

        <Stack.Screen
          name="(authenticated)/(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(authenticated)/(modals)/profile"
          options={{ presentation: "modal", title: "Profile" }}
        />
        <Stack.Screen
          name="(authenticated)/explore/tickets/[ticketId]"
          options={{
            presentation: "modal",
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="(authenticated)/tickets/create"
          options={{
            headerTitle: "Create a ticket",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="help"
          options={{ title: "Help", presentation: "modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <InitialLayout />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
