import { useEffect } from "react";
import { useAuth } from "./useAuthContext";
import { useSearchStore } from "./useSearchContext";

export function useSearchApi() {
	const { accessToken } = useAuth();
	const { searchQuery, setUsers, setIsLoading, setError } = useSearchStore();

	useEffect(() => {
		const searchUsers = async (query?: string) => {
			const searchTerm = query || searchQuery;

			if (!searchTerm.trim() || searchTerm.trim().length < 3) {
				setUsers([]);
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const searchLower = searchTerm.toLowerCase();
				const rangeEnd =
					searchLower.slice(0, -1) +
					String.fromCharCode(
						searchLower.charCodeAt(searchLower.length - 1) + 1
					);

				const response = await fetch(
					`https://api.intra.42.fr/v2/users?range[login]=${encodeURIComponent(
						searchLower
					)},${encodeURIComponent(
						rangeEnd
					)}&page[size]=100&fields[user]=login`,
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

				const foundLogins = users.map((user: any) => user.login);
				console.log(`=== RANGE RECHERCHE "${searchTerm}" ===`);
				console.log(`Range: ${searchLower} à ${rangeEnd}`);
				console.log(foundLogins);
				console.log(
					`=== ${foundLogins.length} utilisateurs trouvés ===`
				);

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
			if (searchQuery.trim() && searchQuery.trim().length >= 3) {
				searchUsers();
			} else {
				setUsers([]);
			}
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [searchQuery, accessToken, setUsers, setIsLoading, setError]);

	return {
		isLoading: useSearchStore().isLoading,
		error: useSearchStore().error,
		users: useSearchStore().users,
	};
}
