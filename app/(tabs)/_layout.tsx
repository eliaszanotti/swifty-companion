import { Tabs } from "expo-router";
import React from "react";
import { BottomNavigation, Icon } from "react-native-paper";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					navigationState={state}
					safeAreaInsets={insets}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								target: state.key,
								...navigation.navigate(route.name, route.params),
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({
								focused,
								color,
								size: 24,
							});
						}
						return null;
					}}
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						return options.title !== undefined
							? options.title
							: route.name;
					}}
				/>
			)}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Recherche",
					tabBarIcon: ({ color, focused }) => (
						<Icon
							source={focused ? "magnify" : "magnify"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profil",
					tabBarIcon: ({ color, focused }) => (
						<Icon
							source={focused ? "account" : "account-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

export default function TabsLayout() {
	return (
		<ProtectedRoute>
			<TabLayout />
		</ProtectedRoute>
	);
}