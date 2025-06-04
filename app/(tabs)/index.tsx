import ListUserCard from "@/components/ListUserCard";
import PaperView from "@/components/PaperView";
import UserDetail from "@/components/user/UserDetail";
import { useSearchApi } from "@/hooks/useSearchApi";
import { useSearchStore } from "@/hooks/useSearchContext";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Searchbar, Text } from "react-native-paper";

export default function SearchScreen() {
	const { searchQuery, setSearchQuery } = useSearchStore();
	const { isLoading, error, users } = useSearchApi();
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

	const handleUserSelect = (userId: string) => {
		setSelectedUserId(userId);
	};

	const handleBackToSearch = () => {
		setSelectedUserId(null);
	};

	if (selectedUserId) {
		return (
			<UserDetail userId={selectedUserId} onBack={handleBackToSearch} />
		);
	}

	return (
		<PaperView>
			<View style={{ padding: 16, gap: 16 }}>
				<Searchbar
					placeholder="Rechercher..."
					value={searchQuery}
					onChangeText={setSearchQuery}
					autoCapitalize="none"
					autoCorrect={false}
				/>

				{error && (
					<Text style={{ color: "red", textAlign: "center" }}>
						{error}
					</Text>
				)}

				{users.length > 0 ? (
					<Text style={styles.usersCount}>{users.length} users</Text>
				) : (
					<Text style={styles.usersCount}>No user found</Text>
				)}

				{isLoading && <ActivityIndicator animating={true} />}
			</View>

			<ScrollView contentContainerStyle={{ padding: 16 }}>
				{users.map((user, index) => (
					<ListUserCard
						key={user.id || index}
						user={user}
						onUserSelect={handleUserSelect}
					/>
				))}
			</ScrollView>
		</PaperView>
	);
}

const styles = StyleSheet.create({
	usersCount: {
		textAlign: "center",
	},
});
