import { useAuth } from "@/hooks/useAuthContext";
import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";

export default function AuthLayout() {
	const { isLoggedIn } = useAuth();

	if (isLoggedIn) {
		return <Redirect href="/(tabs)" />;
	}

	return (
		<PaperProvider>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="error"
					options={{
						headerShown: false,
						presentation: "modal",
					}}
				/>
			</Stack>
		</PaperProvider>
	);
}