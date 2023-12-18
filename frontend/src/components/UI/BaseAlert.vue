<template>
  <Teleport to="main">
    <transition name="backdrop">
      <div
        v-if="message"
        :class="alertClassName"
        class="main-alert text-xl z-10 absolute flex gap-2 items-center bg-alert w-[90%] font-semibold p-4 rounded left-1/2 -translate-x-1/2 border"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        {{ message }}
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String as PropType<string>,
      required: true as boolean,
      default: "" as string,
    },
  },
  setup(props) {
    const alertClassName = ref<string>("");

    watch(
      () => props.message,
      () => {
        if (
          props.message === "All Products Removed" ||
          props.message === "Product Removed!!"
        ) {
          alertClassName.value = "removed";
        } else if (props.message === "Product Adedd") {
          alertClassName.value = "added";
        } else {
          alertClassName.value = "updated";
        }
      }
    );

    return { alertClassName };
  },
});
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

.main-alert {
  &.removed {
    @apply border-error text-error;
  }

  &.added {
    @apply border-lime text-lime;
  }

  &.updated {
    @apply border-blue text-blue;
  }
}

@include animation("backdrop", null, null);
</style>