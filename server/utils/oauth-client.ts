import { google } from "googleapis";
import type { SecureSessionData } from "#auth-utils";

export const useOAuthClient = (credentials: SecureSessionData) => {
  const config = useRuntimeConfig();

  const oauth2Client = new google.auth.OAuth2(
    config.oauth.google.clientId,
    config.oauth.google.clientSecret,
  );

  if (credentials) {
    oauth2Client.setCredentials({
      access_token: credentials.accessToken,
      refresh_token: credentials.refreshToken,
    });
  }

  return oauth2Client;
};
