<template>
  <Teleport to="main">
    <transition name="backdrop">
      <div
        v-if="message"
        :class="alertClassName"
        class="main-alert text-xl z-10 absolute flex gap-2 items-center bg-alert w-[90%] font-semibold p-4 rounded left-1/2 -translate-x-1/2 border"
      >
        <svg
          v-if="checkAlertIcon"
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
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        {{ message }}
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";

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

    const checkAlertIcon = computed(() =>
      alertClassName.value === "error" ? false : true
    );

    watch(
      () => props.message,
      () => {
        if (props.message === "Product Adedd") {
          alertClassName.value = "added";
        } else if (props.message === "Product Updated") {
          alertClassName.value = "updated";
        } else {
          alertClassName.value = "error";
        }
      }
    );

    return { alertClassName, checkAlertIcon };
  },
});
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

.main-alert {
  &.error {
    @apply border-error text-error;
  }

  &.added {
    @apply border-lime text-lime;
  }

  &.updated {
    @apply border-sky text-sky;
  }
}

@include animation("backdrop", null, null);
</style>