<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="flex h-screen flex-col overflow-hidden">
      <header
        class="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4"
      >
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <slot name="header" />
      </header>

      <div class="flex h-full flex-col">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
