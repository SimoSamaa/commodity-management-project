<template>
  <Teleport to="body">
    <transition name="backdrop">
      <div class="fixed inset-0 bg-[#000000b3]" v-if="showModle" @click="tryClose"></div>
    </transition>
    <transition name="filter">
      <div
        v-show="showModle"
        class="filter-modle left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed w-[500px] max-w-[90%] p-4 rounded-md bg-bg"
      >
        <div class="flex items-center justify-between mb-4 border-border border-b pb-4">
          <h3>{{ title }}</h3>
          <div @click="tryClose" class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <slot></slot>
      </div>
    </transition>
  </Teleport>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["close-modle"],
  props: {
    title: {
      type: String as PropType<string>,
      required: true as boolean,
      default: "Title" as string,
    },
    showModle: {
      type: Boolean as PropType<boolean>,
      required: true as boolean,
      default: false as boolean,
    },
  },
  setup(props, { emit }) {
    const tryClose = () => emit("close-modle");

    return { tryClose };
  },
});
</script>


<style scoped lang="scss">
@import "@/scss/helpers/mixins";
@include animation("backdrop", null, null);
@include animation("filter", null, "filter");
</style>