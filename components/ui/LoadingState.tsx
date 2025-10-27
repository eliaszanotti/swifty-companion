import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

interface LoadingStateProps {
	message?: string;
}

export default function LoadingState({
	message = "Loading...",
}: LoadingStateProps) {
	return (
		<View style={styles.container}>
			<ActivityIndicator />
			<Text style={styles.text}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
	},
	text: {
		fontStyle: "italic",
		textAlign: "center",
	},
});
