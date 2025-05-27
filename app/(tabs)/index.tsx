import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import { useState } from "react";
import { Searchbar } from "react-native-paper";

export default function SearchScreen() {
	const [search, setSearch] = useState("");

	return (
		<PaperSafeAreaView>
			<Searchbar
				placeholder="Rechercher..."
				value={search}
				onChangeText={setSearch}
			/>
		</PaperSafeAreaView>
	);
}
