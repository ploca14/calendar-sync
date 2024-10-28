<script setup lang="ts">
const props = defineProps<{
  groups: {
    label: string;
    calendars: {
      label: string;
      url?: string;
    }[];
  }[];
}>();
</script>

<template>
  <template v-for="group in props.groups" :key="group.label">
    <SidebarGroup class="py-0">
      <Collapsible :default-open="true" class="group/collapsible">
        <SidebarGroupLabel
          as-child
          class="group/label w-full text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
        >
          <CollapsibleTrigger>
            {{ group.label }}
            <Icon
              name="lucide:chevron-right"
              class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="(calendar, index) in group.calendars"
                :key="calendar.url"
              >
                <SidebarMenuButton>
                  <div
                    :data-active="index < 2"
                    class="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-gray-200 text-zinc-50 data-[active=true]:border-zinc-900 data-[active=true]:bg-zinc-900"
                  >
                    <Icon
                      name="lucide:check"
                      class="hidden size-3 group-data-[active=true]/calendar-item:block"
                    />
                  </div>
                  {{ calendar.label }}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
    <SidebarSeparator class="mx-0" />
  </template>
</template>
