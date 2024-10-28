<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar";

defineProps<{
  user: {
    name: string;
    email: string;
    picture: string;
  };
}>();

const { isMobile } = useSidebar();

const { clear } = useUserSession();
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-900"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.picture" :alt="user.name" />
              <AvatarFallback
                class="flex items-center justify-center rounded-lg"
              >
                <Icon name="lucide:user" class="size-5" />
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <Icon name="lucide:chevron-down" class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="start"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.picture" :alt="user.name" />
                <AvatarFallback
                  class="flex items-center justify-center rounded-lg"
                >
                  <Icon name="lucide:user" class="size-5" />
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem @click="clear">
            <Icon name="lucide:log-out" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
