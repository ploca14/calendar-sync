export default defineNuxtRouteMiddleware(async (route) => {
  if (route.path === "/login") return;

  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo("/login");
  }
});
