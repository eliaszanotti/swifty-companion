import { DarkPaperTheme, LightPaperTheme } from "@/constants/PaperTheme";
import { AuthProvider } from "@/hooks/useAuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});
	const paperTheme =
		colorScheme === "dark" ? DarkPaperTheme : LightPaperTheme;

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<PaperProvider theme={paperTheme}>
				<AuthProvider>
					<ThemeProvider
						value={
							colorScheme === "dark" ? DarkTheme : DefaultTheme
						}
					>
						<Stack>
							<Stack.Screen
								name="index"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="(tabs)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="login"
								options={{ headerShown: false }}
							/>
						</Stack>
						<StatusBar style="auto" />
					</ThemeProvider>
				</AuthProvider>
			</PaperProvider>
		</SafeAreaProvider>
	);
}

export function Index() {
	return <Redirect href="/(tabs)" />;
}
