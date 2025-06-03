import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import { useSearchApi } from "@/hooks/useSearchApi";
import { useSearchStore } from "@/hooks/useSearchContext";
import { useEffect } from "react";
import { ActivityIndicator, Searchbar, Text } from "react-native-paper";

export default function SearchScreen() {
	const { searchQuery, setSearchQuery } = useSearchStore();
	const { searchUsers, isLoading, error, users } = useSearchApi();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (searchQuery.trim()) {
				searchUsers();
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

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

			<Text>Hello here is the search query: {searchQuery}</Text>
			<Text>Nombre d&apos;utilisateurs trouvés: {users.length}</Text>
		</PaperSafeAreaView>
	);
}
