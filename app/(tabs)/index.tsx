import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

export default function SearchScreen() {
	const [search, setSearch] = useState("");

	return (
		<PaperSafeAreaView style={styles.container}>
			<Searchbar
				placeholder="Rechercher..."
				value={search}
				onChangeText={setSearch}
			/>
		</PaperSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	},
});
