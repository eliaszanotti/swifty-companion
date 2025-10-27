import { Config } from "@/constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
	isLoggedIn: boolean;
	login: () => Promise<void>;
	logout: () => Promise<void>;
	accessToken: string | null;
	isLoading: boolean;
	restoreToken: () => Promise<void>;
	authError: string | null;
	clearAuthError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const TOKEN_REFRESH_KEY = "auth_refresh_token";


export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [authError, setAuthError] = useState<string | null>(null);

	const redirectUri = AuthSession.makeRedirectUri({
		scheme: "swifty-companion",
	});

	const restoreToken = async () => {
		try {
			const isSecureStore = await SecureStore.isAvailableAsync();
			const storedToken = await (isSecureStore
				? SecureStore.getItemAsync(TOKEN_KEY)
				: AsyncStorage.getItem(TOKEN_KEY));

			if (storedToken) {
				setAccessToken(storedToken);
				setIsLoggedIn(true);
				console.log("Token restored from secure storage");
			}
		} catch (error) {
			console.error("Error restoring token:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const storeToken = async (token: string, refreshToken?: string) => {
		try {
			const isSecureStore = await SecureStore.isAvailableAsync();
			if (isSecureStore) {
				await SecureStore.setItemAsync(TOKEN_KEY, token);
				if (refreshToken) {
					await SecureStore.setItemAsync(TOKEN_REFRESH_KEY, refreshToken);
				}
			} else {
				await AsyncStorage.setItem(TOKEN_KEY, token);
				if (refreshToken) {
					await AsyncStorage.setItem(TOKEN_REFRESH_KEY, refreshToken);
				}
			}
			console.log("Token stored securely");
		} catch (error) {
			console.error("Error storing token:", error);
		}
	};

	const clearTokens = async () => {
		try {
			const isSecureStore = await SecureStore.isAvailableAsync();
			if (isSecureStore) {
				await SecureStore.deleteItemAsync(TOKEN_KEY);
				await SecureStore.deleteItemAsync(TOKEN_REFRESH_KEY);
			} else {
				await AsyncStorage.removeItem(TOKEN_KEY);
				await AsyncStorage.removeItem(TOKEN_REFRESH_KEY);
			}
			console.log("Tokens cleared from secure storage");
		} catch (error) {
			console.error("Error clearing tokens:", error);
		}
	};

	useEffect(() => {
		restoreToken();
	}, []);

	const [, response, promptAsync] = AuthSession.useAuthRequest(
		{
			clientId: Config.CLIENT_ID,
			scopes: ["public"],
			redirectUri: redirectUri,
			responseType: AuthSession.ResponseType.Code,
			usePKCE: true,
		},
		{
			authorizationEndpoint: `${Config.API_BASE_URL}/oauth/authorize`,
			tokenEndpoint: `${Config.API_BASE_URL}/oauth/token`,
		}
	);

	React.useEffect(() => {
		if (response?.type === "success") {
			console.log("Success! Code received:", response.params.code);
			setAuthError(null);

			(async () => {
				try {
					setIsLoading(true);
					const tokenResult = await AuthSession.exchangeCodeAsync(
						{
							clientId: Config.CLIENT_ID,
							clientSecret: Config.CLIENT_SECRET,
							code: response.params.code,
							redirectUri: redirectUri,
							extraParams: {},
						},
						{
							tokenEndpoint: `${Config.API_BASE_URL}/oauth/token`,
						}
					);

					console.log("Token received!", tokenResult.accessToken);
					setAccessToken(tokenResult.accessToken);
					setIsLoggedIn(true);

					await storeToken(
						tokenResult.accessToken,
						tokenResult.refreshToken
					);
				} catch (error) {
					console.error("Error during token exchange:", error);
					setAuthError(
						"Failed to complete authentication. Please try again."
					);
				} finally {
					setIsLoading(false);
				}
			})();
		} else if (response?.type === "error") {
			console.log("Error:", response.error);
			setAuthError(
				"Authentication error: " +
					(response.error || "Unknown error occurred")
			);
			setIsLoading(false);
		} else if (response?.type === "cancel") {
			console.log("Canceled by user");
			setAuthError(null);
			setIsLoading(false);
		}
	}, [response, redirectUri]);

	const login = async () => {
		try {
			setIsLoading(true);
			setAuthError(null);
			await promptAsync();
		} catch (error) {
			console.error("Error opening 42 auth page", error);
			setAuthError(
				"Failed to open authentication page. Please check your connection."
			);
			setIsLoading(false);
		}
	};

	const clearAuthError = () => {
		setAuthError(null);
	};

	const logout = async () => {
		try {
			setIsLoading(true);
			await clearTokens();
			setAccessToken(null);
			setIsLoggedIn(false);
			console.log("User logged out successfully");
		} catch (error) {
			console.error("Error during logout:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				login,
				logout,
				accessToken,
				isLoading,
				restoreToken,
				authError,
				clearAuthError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
