import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import { useSearchStore } from "@/hooks/useSearchContext";
import { Searchbar, Text } from "react-native-paper";

export default function SearchScreen() {
	const { searchQuery, setSearchQuery } = useSearchStore();

	return (
		<PaperSafeAreaView>
			<Searchbar
				placeholder="Rechercher..."
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>
			<Text>Hello here is the search query: {searchQuery}</Text>
		</PaperSafeAreaView>
	);
}
