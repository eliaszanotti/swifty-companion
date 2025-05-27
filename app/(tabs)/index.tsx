import { DarkPaperTheme, LightPaperTheme } from "@/constants/PaperTheme";
import { useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { PaperProvider, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
	const colorScheme = useColorScheme();
	const paperTheme =
		colorScheme === "dark" ? DarkPaperTheme : LightPaperTheme;
	const [search, setSearch] = useState("");

	return (
		<PaperProvider theme={paperTheme}>
			<SafeAreaView style={styles.container}>
				<Searchbar
					placeholder="Rechercher..."
					value={search}
					onChangeText={setSearch}
				/>
			</SafeAreaView>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	},
});
