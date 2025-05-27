import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import { BottomNavigation, Icon, Provider } from "react-native-paper";

import SearchScreen from "./index";
import ProfileScreen from "./profile";
// import LoginScreen from "./login"; // Importez le nouvel écran de connexion

const Tab = createBottomTabNavigator();

export default function TabLayout() {
	return (
		<Provider>
			<Tab.Navigator
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
									...CommonActions.navigate(
										route.name,
										route.params
									),
									target: state.key,
								});
							}
						}}
						renderIcon={({ route, focused, color }) => {
							const { options } = descriptors[route.key];
							if (options.tabBarIcon) {
								// @ts-ignore
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
				<Tab.Screen
					name="index"
					component={SearchScreen}
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
				<Tab.Screen
					name="profile"
					component={ProfileScreen}
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
				{/* Ajoutez le nouvel onglet de connexion ici */}
				{/* <Tab.Screen
					name="login"
					component={LoginScreen}
					options={{
						title: "Connexion",
						tabBarIcon: ({ color, focused }) => (
							<Icon
								source={focused ? "login" : "login-variant"} // Icône de connexion
								color={color}
								size={24}
							/>
						),
					}}
				/> */}
			</Tab.Navigator>
		</Provider>
	);
}
