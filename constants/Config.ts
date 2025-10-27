import { API_CLIENT_ID, API_CLIENT_SECRET, API_BASE_URL } from '@env';

export const Config = {
	CLIENT_ID: API_CLIENT_ID || "",
	CLIENT_SECRET: API_CLIENT_SECRET || "",
	API_BASE_URL: API_BASE_URL || "https://api.intra.42.fr",
};
