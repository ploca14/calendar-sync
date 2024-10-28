<script setup lang="ts">
const { user } = useUserSession();

const { data: connectedCalendars } = useQuery({
  queryKey: ["calendars", "connected"],
  queryFn: () => $fetch("/api/calendars"),
});

const syncedCalendars = ref([
  { label: "Calendar 4", url: "https://example.com/calendar4.ics" },
]);
</script>

<template>
  <Sidebar>
    <SidebarHeader class="h-16 border-b border-gray-200">
      <NavUser v-if="user" :user="user" />
    </SidebarHeader>
    <SidebarContent class="pt-2">
      <!-- <Calendars :groups="calendars" /> -->
      <SidebarGroup class="py-0">
        <Collapsible :default-open="true" class="group/collapsible">
          <SidebarGroupLabel
            as-child
            class="group/label w-full text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <CollapsibleTrigger>
              Connected Calendars
              <Icon
                name="lucide:chevron-right"
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu v-if="connectedCalendars">
                <SidebarMenuItem
                  v-for="(calendar, index) in connectedCalendars"
                  :key="calendar?.id ?? index"
                >
                  <SidebarMenuButton>
                    <div
                      class="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-gray-200 bg-white text-zinc-50 data-[active=true]:border-zinc-900 data-[active=true]:bg-zinc-900"
                    >
                      <Icon
                        name="lucide:check"
                        class="hidden size-3 group-data-[active=true]/calendar-item:block"
                      />
                    </div>
                    {{ calendar.summary ?? `Calendar ${index + 1}` }}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
      <SidebarSeparator class="mx-0" />
      <SidebarGroup class="py-0">
        <Collapsible :default-open="true" class="group/collapsible">
          <SidebarGroupLabel
            class="group/label relative w-full text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <CollapsibleTrigger class="flex w-full items-center">
              Synced Calendars
              <Icon
                name="lucide:chevron-right"
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </CollapsibleTrigger>

            <DropdownMenu>
              <DropdownMenuTrigger
                class="absolute right-6 top-1 mr-1 grid size-6 place-items-center rounded-sm hover:bg-zinc-200"
              >
                <Icon name="lucide:plus" />
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent
                  class="w-[--radix-dropdown-menu-trigger-width] min-w-96 rounded-lg"
                  side="right"
                  align="start"
                  :side-offset="32"
                >
                  <form
                    class="flex flex-col gap-2 p-2"
                    @submit.prevent="handleAddCalendar"
                  >
                    <div class="flex-1">
                      <Label for="calendar-url">Calendar Name</Label>
                      <Input
                        id="calendar-name"
                        placeholder="Example Calendar"
                      />
                    </div>
                    <div class="flex-1">
                      <Label for="calendar-url">Calendar URL</Label>
                      <Input
                        id="calendar-url"
                        placeholder="https://example.com/calendar.ics"
                      />
                    </div>
                    <Button class="mt-2" type="submit">Add Calendar</Button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </SidebarGroupLabel>

          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="calendar in syncedCalendars"
                  :key="calendar.url"
                  class="group/calendar-item relative"
                >
                  <SidebarMenuButton
                    class="group-hover/calendar-item:bg-zinc-100"
                  >
                    <div
                      data-active="true"
                      class="group/calendar-item-checkbox flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-gray-200 bg-white text-zinc-50 data-[active=true]:border-zinc-900 data-[active=true]:bg-zinc-900"
                    >
                      <Icon
                        name="lucide:check"
                        class="hidden size-3 group-data-[active=true]/calendar-item-checkbox:block"
                      />
                    </div>
                    {{ calendar.label }}
                  </SidebarMenuButton>
                  <button
                    class="absolute right-1 top-1 ml-auto hidden size-6 place-items-center rounded-sm text-zinc-500 hover:text-red-500 group-hover/calendar-item:grid"
                  >
                    <Icon name="lucide:trash" />
                  </button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
    </SidebarContent>
    <!-- <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Icon name="lucide:plus" />
            <span>New Calendar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter> -->
    <SidebarRail />
  </Sidebar>
</template>
