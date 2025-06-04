import ListUserCard from "@/components/ListUserCard";
import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import UserDetail from "@/components/user/UserDetail";
import { useSearchApi } from "@/hooks/useSearchApi";
import { useSearchStore } from "@/hooks/useSearchContext";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
		<PaperSafeAreaView style={{ gap: 16 }}>
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

			{users.length > 0 ? (
				<Text style={styles.usersCount}>{users.length} users</Text>
			) : (
				<Text style={styles.usersCount}>No user found</Text>
			)}

			<ScrollView>
				{users.map((user, index) => (
					<ListUserCard
						key={user.id || index}
						user={user}
						onUserSelect={handleUserSelect}
					/>
				))}
			</ScrollView>
		</PaperSafeAreaView>
	);
}

const styles = StyleSheet.create({
	usersCount: {
		textAlign: "center",
	},
});
