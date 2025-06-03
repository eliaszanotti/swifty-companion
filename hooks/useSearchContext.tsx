import { createContext, ReactNode, useContext, useState } from "react";

interface User {
	id: number;
	login: string;
	displayname: string;
	email: string;
	image: {
		link: string;
	};
}

interface SearchState {
	searchQuery: string;
	users: User[];
	isLoading: boolean;
	error: string | null;
}

interface SearchContextType extends SearchState {
	setSearchQuery: (query: string) => void;
	setUsers: (users: User[]) => void;
	setIsLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearSearch = () => {
		setSearchQuery("");
		setUsers([]);
		setError(null);
		setIsLoading(false);
	};

	return (
		<SearchContext.Provider
			value={{
				searchQuery,
				users,
				isLoading,
				error,
				setSearchQuery,
				setUsers,
				setIsLoading,
				setError,
				clearSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
}

export function useSearchStore() {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error("useSearchStore must be used within a SearchProvider");
	}
	return context;
}
