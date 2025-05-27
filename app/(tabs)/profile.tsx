import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
		>
			<Text style={[styles.title, { color: theme.colors.onSurface }]}>
				Profile
			</Text>
			<Text style={{ color: theme.colors.onSurface }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
		gap: 16,
	},
	title: {
		fontSize: 32,
		width: "100%",
		fontWeight: "bold",
	},
});
