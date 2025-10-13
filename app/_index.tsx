import { router } from "expo-router";
import { useEffect } from "react";

export default function IndexPage() {
	useEffect(() => {
		router.replace("/(tabs)");
	}, []);

	return null;
}