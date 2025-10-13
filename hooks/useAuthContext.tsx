import { Config } from "@/constants/Config";
import * as AuthSession from "expo-auth-session";
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
	isLoggedIn: boolean;
	login: () => Promise<void>;
	logout: () => void;
	accessToken: string | null;
	isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const redirectUri = AuthSession.makeRedirectUri({
		scheme: "swifty-companion",
	});

	console.log("Redirect URI used:", redirectUri);

	const [_, response, promptAsync] = AuthSession.useAuthRequest(
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

			(async () => {
				try {
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
				} catch (error) {
					console.error("Error during token exchange:", error);
				} finally {
					setIsLoading(false);
				}
			})();
		} else if (response?.type === "error") {
			console.log("Error:", response.error);
			setIsLoading(false);
		} else if (response?.type === "cancel") {
			console.log("Canceled by user");
			setIsLoading(false);
		}
	}, [response, redirectUri]);

	const login = async () => {
		try {
			setIsLoading(true);
			await promptAsync();
		} catch (error) {
			console.error("Error opening 42 auth page", error);
			setIsLoading(false);
		}
	};

	const logout = () => {
		setIsLoggedIn(false);
		setAccessToken(null);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				login,
				logout,
				accessToken,
				isLoading,
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
