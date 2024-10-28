export default defineNitroPlugin(() => {
  sessionHooks.hook("fetch", async (session, event) => {
    if (!session.secure) return;

    const refreshedTokens = await refreshTokens(session.secure);

    if (refreshedTokens) {
      await setUserSession(event, {
        secure: refreshedTokens,
      });
    } else {
      await clearUserSession(event);
    }
  });
});
