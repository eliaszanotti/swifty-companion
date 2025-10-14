import React from "react";
import PaperView from "@/components/PaperView";
import { DarkPaperTheme, LightPaperTheme } from "@/constants/PaperTheme";
import { AuthProvider } from "@/hooks/useAuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuthContext";

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<AuthProvider>
				<RootLayoutContent />
			</AuthProvider>
		</SafeAreaProvider>
	);
}

function RootLayoutContent() {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();
	const { isLoggedIn, isLoading } = useAuth();

	const paperTheme =
		colorScheme === "dark" ? DarkPaperTheme : LightPaperTheme;

	useEffect(() => {
		if (!isLoading) {
			if (isLoggedIn) {
				router.replace("/(tabs)");
			} else {
				router.replace("/");
			}
		}
	}, [isLoggedIn, isLoading]);

	return (
		<PaperProvider theme={paperTheme}>
			<ThemeProvider
				value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
				<PaperView style={{ paddingTop: insets.top, flex: 1 }}>
					<Stack>
						<Stack.Screen
							name="index"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(tabs)"
							options={{
								headerShown: false,
								animation: "fade",
							}}
						/>
						<Stack.Screen
							name="user/[login]"
							options={{
								headerShown: false,
								presentation: "modal",
							}}
						/>
					</Stack>
				</PaperView>
				<StatusBar
					style={colorScheme === "dark" ? "light" : "dark"}
					backgroundColor="transparent"
				/>
			</ThemeProvider>
		</PaperProvider>
	);
}