import { useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { PaperProvider, Searchbar } from "react-native-paper";
import { DarkPaperTheme, LightPaperTheme } from "../constants/PaperTheme";

export default function SearchScreen() {
	const colorScheme = useColorScheme();
	const paperTheme =
		colorScheme === "dark" ? DarkPaperTheme : LightPaperTheme;
	const [search, setSearch] = useState("");

	return (
		<PaperProvider theme={paperTheme}>
			<View style={styles.container}>
				<Searchbar
					placeholder="Rechercher..."
					value={search}
					onChangeText={setSearch}
				/>
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 24,
	},
});
