import { useEffect } from "react";
import { useAuth } from "./useAuthContext";
import { useSearchStore } from "./useSearchContext";

export function useSearchApi() {
	const { accessToken } = useAuth();
	const { searchQuery, setUsers, setIsLoading, setError } = useSearchStore();

	useEffect(() => {
		const searchUsers = async (query?: string) => {
			const searchTerm = query || searchQuery;

			if (!searchTerm.trim()) {
				setUsers([]);
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`https://api.intra.42.fr/v2/users?search=${encodeURIComponent(
						searchTerm
					)}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Erreur API: ${response.status}`);
				}

				const users = await response.json();
				setUsers(users);
			} catch (error) {
				console.error("Erreur lors de la recherche:", error);
				setError("Erreur lors de la recherche d'utilisateurs");
				setUsers([]);
			} finally {
				setIsLoading(false);
			}
		};

		const timeoutId = setTimeout(() => {
			if (searchQuery.trim()) {
				searchUsers();
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchQuery, accessToken, setUsers, setIsLoading, setError]);

	return {
		isLoading: useSearchStore().isLoading,
		error: useSearchStore().error,
		users: useSearchStore().users,
	};
}
