export default defineNuxtPlugin(() => {
  const { loggedIn } = useUserSession();

  watchEffect(() => {
    if (!loggedIn.value) {
      navigateTo("/login");
    }
  });
});
