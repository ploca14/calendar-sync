<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900"
  >
    <Card class="w-[350px]">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button class="w-full" as-child>
          <NuxtLink to="/auth/google" external>
            <Icon name="cib:google" class="mr-2 h-4 w-4" />
            Sign in with Google
          </NuxtLink>
        </Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts"></script>
