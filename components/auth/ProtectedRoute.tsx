import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuthContext";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isLoggedIn, isLoading } = useAuth();

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!isLoggedIn) {
		return <Redirect href="/(auth)" />;
	}

	return <>{children}</>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
