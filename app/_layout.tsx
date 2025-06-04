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
import { View } from "react-native";
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
					<View
						style={{
							flex: 1,
							paddingTop: insets.top,
							backgroundColor: paperTheme.colors.background,
						}}
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
					</View>
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
