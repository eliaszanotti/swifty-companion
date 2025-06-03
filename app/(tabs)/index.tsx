import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import { useSearchApi } from "@/hooks/useSearchApi";
import { useSearchStore } from "@/hooks/useSearchContext";
import { View } from "react-native";
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

			<View style={{ padding: 16 }}>
				<Text style={{ fontSize: 16, fontWeight: "bold" }}>
					Recherche: &quot;{searchQuery}&quot;
				</Text>
				<Text style={{ fontSize: 14, marginTop: 8 }}>
					Nombre d&apos;utilisateurs trouvés: {users.length}
				</Text>

				{users.length > 0 && (
					<View style={{ marginTop: 16 }}>
						<Text style={{ fontSize: 14, fontWeight: "bold" }}>
							Logins:
						</Text>
						{users.map((user, index) => (
							<Text
								key={user.id || index}
								style={{ fontSize: 12, marginLeft: 8 }}
							>
								• {user.login}
							</Text>
						))}
					</View>
				)}
			</View>
		</PaperSafeAreaView>
	);
}
