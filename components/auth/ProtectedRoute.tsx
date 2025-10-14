import { useAuth } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isLoggedIn, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && !isLoggedIn) {
			router.push("/");
		}
	}, [isLoggedIn, isLoading]);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!isLoggedIn) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
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
