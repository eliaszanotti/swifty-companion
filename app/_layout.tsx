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
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

function RootLayoutWithInset() {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();
	const paperTheme =
		colorScheme === "dark" ? DarkPaperTheme : LightPaperTheme;

	return (
		<PaperProvider theme={paperTheme}>
			<AuthProvider>
				<ThemeProvider
					value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
				>
					<PaperView style={{ paddingTop: insets.top }}>
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
					</PaperView>
					<StatusBar
						style={colorScheme === "dark" ? "light" : "dark"}
						backgroundColor="transparent"
					/>
				</ThemeProvider>
			</AuthProvider>
		</PaperProvider>
	);
}

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<RootLayoutWithInset />
		</SafeAreaProvider>
	);
}

export function Index() {
	return <Redirect href="/(tabs)" />;
}
