import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Card, TextInput } from "react-native-paper";

interface SearchInputProps {
	value?: string;
	onChangeText: (text: string) => void;
	isLoading?: boolean;
	error?: string;
}

export default function SearchInput({
	value,
	onChangeText,
	isLoading = false,
	error,
}: SearchInputProps) {
	const handleTextChange = useCallback(
		(text: string) => {
			onChangeText(text);
		},
		[onChangeText]
	);

	return (
		<Card mode="elevated">
			<Card.Title
				title="Search for a student"
				subtitle="Enter at least 3 characters"
			/>
			<Card.Content>
				<TextInput
					mode="outlined"
					placeholder="Search for a 42 login..."
					value={value || ""}
					onChangeText={handleTextChange}
					right={
						isLoading ? (
							<TextInput.Icon
								icon={() => <ActivityIndicator size="small" />}
							/>
						) : (
							<TextInput.Icon icon="magnify" />
						)
					}
					style={styles.searchInput}
					error={!!error}
				/>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	searchTitle: {
		marginBottom: 16,
	},
	searchInput: {
		marginBottom: 8,
	},
	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginVertical: 8,
	},
	loadingText: {
		fontStyle: "italic",
	},
	helperText: {
		fontSize: 12,
		marginTop: 4,
	},
	errorText: {
		color: "#B00020",
	},
});
