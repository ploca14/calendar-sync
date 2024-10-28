<script setup lang="ts">
definePageMeta({
  layout: false,
});

const today = new Date();
const currentDate = ref(new Date(today));

const nextDate = () => {
  currentDate.value = new Date(
    currentDate.value.setDate(currentDate.value.getDate() + 7),
  );
};

const prevDate = () => {
  currentDate.value = new Date(
    currentDate.value.setDate(currentDate.value.getDate() - 7),
  );
};

const setToday = () => {
  currentDate.value = new Date(today);
};

const startOfWeek = computed(() => {
  const date = new Date(currentDate.value);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // If Sunday (0), go back 6 days, otherwise adjust to Monday
  return new Date(date.setDate(date.getDate() + diff));
});

const endOfWeek = computed(() => {
  const date = new Date(startOfWeek.value);
  date.setDate(date.getDate() + 6);
  return date;
});

const days = computed(() => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek.value);
    date.setDate(date.getDate() + i);
    return date;
  });
});

const { arrowLeft, arrowRight } = useMagicKeys();

watchEffect(() => {
  if (arrowLeft?.value) prevDate();
  if (arrowRight?.value) nextDate();
});
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <div class="flex w-full items-center justify-between">
        <h2 class="text-lg font-semibold">
          <template v-if="startOfWeek.getMonth() !== endOfWeek.getMonth()">
            {{
              startOfWeek.toLocaleDateString("en-US", {
                month: "long",
              })
            }}
            -
          </template>
          {{
            endOfWeek.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          }}
        </h2>
        <div class="flex items-center space-x-4">
          <Button variant="outline" size="icon" @click="prevDate">
            <Icon name="lucide:chevron-left" class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" @click="setToday">
            <Icon name="lucide:circle" class="h-3 w-3" />
          </Button>
          <Button variant="outline" size="icon" @click="nextDate">
            <Icon name="lucide:chevron-right" class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </template>

    <ScrollArea ref="scrollArea" class="h-full flex-1">
      <div
        class="flex max-w-none flex-none flex-col md:max-w-full"
        style="width: 165%"
      >
        <div
          class="sticky top-0 z-30 flex-none bg-white pr-8 shadow ring-1 ring-black ring-opacity-5"
        >
          <div
            class="-mr-px grid grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500"
          >
            <div class="col-end-1 w-14" />
            <div
              v-for="day in days"
              :key="day.toISOString()"
              class="flex items-center justify-center py-3"
            >
              <span>
                {{ day.toLocaleDateString("en-US", { weekday: "short" }) }}
                <span
                  :data-active="day.toISOString() === today.toISOString()"
                  class="inline-grid place-items-center rounded-full font-semibold text-gray-900 data-[active=true]:size-6 data-[active=true]:bg-zinc-900 data-[active=true]:text-white"
                >
                  {{ day.getDate() }}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-auto">
          <div
            class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100"
          />
          <div class="grid flex-auto grid-cols-1 grid-rows-1">
            <!-- Horizontal lines -->
            <div
              class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style="grid-template-rows: repeat(24, minmax(3.5rem, 1fr))"
            >
              <div ref="containerOffset" class="row-end-1 h-7" />
              <template v-for="hour in 24" :key="hour">
                <div>
                  <div
                    class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                  >
                    {{ hour }}:00
                  </div>
                </div>
              </template>
            </div>

            <!-- Vertical lines -->
            <div
              class="col-start-1 col-end-2 row-start-1 grid grid-cols-7 grid-rows-1 divide-x divide-gray-100"
            >
              <div
                v-for="day in days"
                :key="day.toISOString()"
                class="row-span-full"
              />
              <div class="col-start-8 row-span-full w-8" />
            </div>

            <!-- Events -->
            <ol
              class="col-start-1 col-end-2 row-start-1 grid grid-cols-7 pr-8"
              style="
                grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto;
              "
            >
              <li
                class="relative col-start-3 mt-px flex"
                style="grid-row: 74 / span 12"
              >
                <a
                  href="#"
                  class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                >
                  <p class="order-1 font-semibold text-blue-700">Breakfast</p>
                  <p class="text-blue-500 group-hover:text-blue-700">
                    <time datetime="2022-01-12T06:00">6:00 AM</time>
                  </p>
                </a>
              </li>
              <li
                class="relative col-start-3 mt-px flex"
                style="grid-row: 92 / span 30"
              >
                <a
                  href="#"
                  class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                >
                  <p class="order-1 font-semibold text-pink-700">
                    Flight to Paris
                  </p>
                  <p class="text-pink-500 group-hover:text-pink-700">
                    <time datetime="2022-01-12T07:30">7:30 AM</time>
                  </p>
                </a>
              </li>
              <li
                class="relative col-start-6 mt-px flex"
                style="grid-row: 122 / span 24"
              >
                <a
                  href="#"
                  class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                >
                  <p class="order-1 font-semibold text-gray-700">
                    Meeting with design team at Disney
                  </p>
                  <p class="text-gray-500 group-hover:text-gray-700">
                    <time datetime="2022-01-15T10:00">10:00 AM</time>
                  </p>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </ScrollArea>
  </NuxtLayout>
</template>
