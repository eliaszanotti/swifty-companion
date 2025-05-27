import { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
	const [search, setSearch] = useState("");

	return (
		<SafeAreaView style={styles.container}>
			<Searchbar
				placeholder="Rechercher..."
				value={search}
				onChangeText={setSearch}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	},
});
