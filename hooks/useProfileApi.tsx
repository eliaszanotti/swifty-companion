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
}

export function useProfileApi() {
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
				const response = await fetch("https://api.intra.42.fr/v2/me", {
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
	}, [accessToken]);

	return {
		userInfo,
		loading,
		error,
	};
}
