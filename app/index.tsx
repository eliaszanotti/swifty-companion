import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { PaperProvider, TextInput } from "react-native-paper";
import { Colors } from "../constants/Colors";
import { DarkPaperTheme, LightPaperTheme } from "../constants/PaperTheme";

export default function SearchScreen() {
	const colorScheme = useColorScheme();
	const paperTheme =
		colorScheme === "dark" ? DarkPaperTheme : LightPaperTheme;
	const textColor = Colors[colorScheme ?? "light"].text;

	return (
		<PaperProvider theme={paperTheme}>
			<View style={styles.container}>
				<TextInput
					style={styles.searchInput}
					placeholder="Rechercher..."
				/>
				<Text style={[styles.middleText, { color: textColor }]}>
					Ceci est le texte au milieu
				</Text>
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 20,
	},
	searchInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		width: "90%",
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	middleText: {
		fontSize: 20,
	},
});
