import PaperView from "@/components/PaperView";
import SearchInput from "@/components/search/SearchInput";
import UserListItem from "@/components/search/UserListItem";
import EmptyState from "@/components/ui/EmptyState";
import { useSearchApi } from "@/hooks/useSearchApi";
import { SearchProvider, useSearchStore } from "@/hooks/useSearchContext";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function SearchContent() {
	const { searchQuery, setSearchQuery } = useSearchStore();
	const { users, isLoading, error } = useSearchApi();

	return (
		<PaperView>
			<View style={{ padding: 16 }}>
				<SearchInput
					value={searchQuery}
					onChangeText={setSearchQuery}
					isLoading={isLoading}
				/>
			</View>

			<ScrollView style={styles.content}>
				<View style={styles.contentView}>
					{users.length > 0 && (
						<View style={styles.resultsContainer}>
							<Text>Results ({users.length})</Text>
							<ScrollView>
								{users.map((user: any) => (
									<UserListItem key={user.id} user={user} />
								))}
							</ScrollView>
						</View>
					)}

					{!isLoading &&
						!error &&
						searchQuery.trim().length >= 3 &&
						users.length === 0 && (
							<EmptyState
								title="No user found"
								message={`No user found for "${searchQuery}"`}
								icon="🔍"
							/>
						)}
				</View>
			</ScrollView>
		</PaperView>
	);
}

export default function SearchPage() {
	return (
		<SearchProvider>
			<SearchContent />
		</SearchProvider>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: "column",
	},
	contentView: {
		flex: 1,
		flexDirection: "column",
		gap: 16,
		padding: 16,
	},
	resultsContainer: {
		gap: 8,
	},
});
