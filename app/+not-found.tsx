import { Link, Stack } from "expo-router";
import { StyleSheet, View, useColorScheme } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import { DarkPaperTheme, LightPaperTheme } from "../constants/PaperTheme";

export default function NotFoundScreen() {
	const colorScheme = useColorScheme();
	const paperTheme =
		colorScheme === "dark" ? DarkPaperTheme : LightPaperTheme;

	return (
		<PaperProvider theme={paperTheme}>
			<View style={styles.container}>
				<Stack.Screen options={{ title: "Oops!" }} />
				<Link href="/" style={styles.link}>
					<Text>Go to home screen!</Text>
				</Link>
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
