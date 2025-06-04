import { useEffect, useState } from "react";
import { useAuth } from "./useAuthContext";

interface UserInfo {
	id: number;
	login: string;
	displayname: string;
	email: string;
	image: {
		link: string;
	};
	cursus_users: any[];
	projects_users: any[];
	location?: string;
}

export function useProfileApi(userId?: string) {
	const { accessToken } = useAuth();
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!accessToken) return;

		const fetchUserInfo = async () => {
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
				} else {
					throw new Error(`Erreur API: ${response.status}`);
				}
			} catch (error) {
				console.error("Error fetching user info:", error);
				setError("Erreur lors de la récupération du profil");
				setUserInfo(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUserInfo();
	}, [accessToken, userId]);

	return {
		userInfo,
		loading,
		error,
	};
}
