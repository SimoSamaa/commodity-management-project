<template>
  <button :class="hover" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    hover: {
      type: String as PropType<string>,
      required: false as boolean,
      default: "" as string,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      required: false as boolean,
      default: false as boolean,
    },
  },
});
</script>

<style scoped lang="scss">
button {
  @apply font-medium px-4 py-2 shadow-md;

  &:active {
    filter: brightness(1.2);
    @apply scale-95 shadow-none;
  }

  &:disabled {
    cursor: no-drop;
    filter: brightness(0.7);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--clr-bg), 0 0 0 4.5px var(--clr-border);
  }

  &.green {
    @apply bg-green text-white;
  }

  &.red {
    @apply bg-red text-white;
  }

  &.blue {
    @apply bg-blue text-white;
  }
}
</style>