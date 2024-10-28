import type { SecureSessionData } from "#auth-utils";

export const refreshTokens = async (credentials: SecureSessionData) => {
  const oauth2Client = useOAuthClient(credentials);

  if (credentials.expiresAt < Date.now()) {
    try {
      const { res } = await oauth2Client.refreshAccessToken();

      const tokens = res?.data;

      if (!tokens) {
        throw new Error("oauth2Client.refreshAccessToken() failed");
      }

      return {
        accessToken: tokens.access_token,
        expiresAt: tokens.expiry_date,
        refreshToken: tokens.refresh_token,
      } as SecureSessionData;
    } catch (error) {
      console.error("Error refreshing tokens", error);
      return null;
    }
  }

  return credentials;
};
