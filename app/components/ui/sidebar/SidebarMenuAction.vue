<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps } from "radix-vue";

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      showOnHover?: boolean;
      class?: HTMLAttributes["class"];
    }
  >(),
  {
    as: "button",
  },
);
</script>

<template>
  <Primitive
    data-sidebar="menu-action"
    :class="
      cn(
        'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-zinc-700 outline-none ring-zinc-400 transition-transform hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 peer-hover/menu-button:text-zinc-900 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-zinc-900 md:opacity-0',
        props.class,
      )
    "
    :as="as"
    :as-child="asChild"
  />
</template>
