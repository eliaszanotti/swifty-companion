import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import { useSearchApi } from "@/hooks/useSearchApi";
import { useSearchStore } from "@/hooks/useSearchContext";
import { ActivityIndicator, Searchbar, Text } from "react-native-paper";

export default function SearchScreen() {
	const { searchQuery, setSearchQuery } = useSearchStore();
	const { isLoading, error, users } = useSearchApi();

	return (
		<PaperSafeAreaView>
			<Searchbar
				placeholder="Rechercher..."
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			{isLoading && <ActivityIndicator animating={true} />}

			{error && (
				<Text style={{ color: "red", textAlign: "center" }}>
					{error}
				</Text>
			)}

			{users.length > 0 && (
				<Text>Nombre d&apos;utilisateurs trouvés: {users.length}</Text>
			)}
		</PaperSafeAreaView>
	);
}
