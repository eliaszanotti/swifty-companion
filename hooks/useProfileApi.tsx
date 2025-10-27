import { useEffect, useState } from "react";
import { useAuth } from "./useAuthContext";
import { User } from "@/types/api";

export function useProfileApi(userId?: string) {
	const { accessToken, logout } = useAuth();
	const [userInfo, setUserInfo] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleAuthError = async (status: number) => {
		if (status === 401) {
			setError("Session expired, please login again");
			setUserInfo(null);
			await logout();
			return true;
		}
		return false;
	};

	const fetchUserInfo = async () => {
		if (!accessToken) return;

		setLoading(true);
		setError(null);

		try {
			const endpoint = userId
				? `https://api.intra.42.fr/v2/users/${userId}`
				: "https://api.intra.42.fr/v2/me";

			const response = await fetch(endpoint, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.ok) {
				const userData = await response.json();
				setUserInfo(userData);
			} else if (await handleAuthError(response.status)) {
				return;
			} else {
				throw new Error(`API error: ${response.status}`);
			}
		} catch (error) {
			console.error("Error fetching user info:", error);
			setError("Failed to fetch user profile");
			setUserInfo(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserInfo();
	}, [accessToken, userId]);

	return {
		userInfo,
		loading,
		error,
	};
}
