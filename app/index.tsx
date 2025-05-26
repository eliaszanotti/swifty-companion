import { StyleSheet, View, useColorScheme } from "react-native";
import { PaperProvider, Text, TextInput, useTheme } from "react-native-paper";
import { DarkPaperTheme, LightPaperTheme } from "../constants/PaperTheme";

export default function SearchScreen() {
	const colorScheme = useColorScheme();
	const paperTheme =
		colorScheme === "dark" ? DarkPaperTheme : LightPaperTheme;
	const theme = useTheme();

	return (
		<PaperProvider theme={paperTheme}>
			<View style={styles.container}>
				<Text
					variant="headlineLarge"
					style={{ color: theme.colors.primary }}
				>
					Accueil
				</Text>
				<TextInput placeholder="Rechercher..." />
				<Text>Ceci est le texte au milieu</Text>
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 20,
		gap: 20,
	},
});
