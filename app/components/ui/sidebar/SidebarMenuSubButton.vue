<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Primitive } from "radix-vue";

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      size?: "sm" | "md";
      isActive?: boolean;
      class?: HTMLAttributes["class"];
    }
  >(),
  {
    as: "a",
    size: "md",
  },
);
</script>

<template>
  <Primitive
    data-sidebar="menu-sub-button"
    :as="as"
    :as-child="asChild"
    :data-size="size"
    :data-active="isActive"
    :class="
      cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-zinc-700 outline-none ring-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 active:bg-zinc-100 active:text-zinc-900 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-zinc-900',
        'data-[active=true]:bg-zinc-100 data-[active=true]:text-zinc-900',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
