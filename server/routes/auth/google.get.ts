export default defineOAuthGoogleEventHandler({
  config: {
    authorizationParams: {
      access_type: "offline",
      prompt: "consent", // Add this to ensure refresh token is always provided
    },
    scope: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ],
  },

  async onSuccess(event, { user, tokens }) {
    // Store the tokens with TTL matching the token expiration
    await authStorage().setItem(`${user.email}:tokens`, {
      refresh_token: tokens.refresh_token,
    });

    await setUserSession(event, {
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,
        givenName: user.given_name,
        familyName: user.family_name,
      },
      secure: {
        accessToken: tokens.access_token,
      },
    });

    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/login");
  },
});
