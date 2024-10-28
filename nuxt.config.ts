export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "nuxt-auth-utils",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@vueuse/nuxt",
  ],

  devtools: { enabled: true },

  runtimeConfig: {},
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-07-30",

  hub: {
    kv: true,
  },

  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
});
