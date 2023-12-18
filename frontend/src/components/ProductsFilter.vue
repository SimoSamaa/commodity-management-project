<template>
  <section class="grid gap-4">
    <div class="relative">
      <input checked type="checkbox" id="laptop" class="hidden" @change="setFilter" />
      <label for="laptop">
        <div class="ml-8">laptop</div>
      </label>
    </div>
    <div class="relative">
      <input checked type="checkbox" id="phone" class="hidden" @change="setFilter" />
      <label for="phone">
        <div class="ml-8">phone</div>
      </label>
    </div>
    <div class="relative">
      <input checked type="checkbox" id="tv" class="hidden" @change="setFilter" />
      <label for="tv">
        <div class="ml-8">tv</div>
      </label>
    </div>
    <div class="relative">
      <input checked type="checkbox" id="watch" class="hidden" @change="setFilter" />
      <label for="watch">
        <div class="ml-8">watch</div>
      </label>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import { CategorysBoo } from "../types/interfaces";

export default defineComponent({
  emits: ["change-filter"],
  setup(prop, { emit }) {
    const filters = ref<CategorysBoo>({
      phone: true,
      tv: true,
      laptop: true,
      watch: true,
    });

    const setFilter = (e: Event) => {
      const inputId = (e.target as HTMLInputElement).id;
      const isActive = (e.target as HTMLInputElement).checked;
      const updatedFilters = {
        ...filters.value,
        [inputId]: isActive as boolean,
      };

      filters.value = updatedFilters;

      emit("change-filter", updatedFilters);
    };

    return { filters, setFilter };
  },
});
</script>

<style scoped lang="scss">
label {
  @apply relative block cursor-pointer rounded 
        border-border border-2 bg-seconder;
  top: 1px;
  width: 27px;
  height: 27px;
  transition: background 200ms ease-out;

  &:after {
    content: "";
    @apply absolute top-[2px] left-[8px] opacity-0 
          w-[7px] h-[14px];
    transform: rotate(45deg) scale(0);
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transition: all 200ms ease-out;
  }
}

$checkboxid: ("phone" 100, "laptop" 200, "tv" 300, "watch" 400);

@each $id, $dely in $checkboxid {
  ##{$id}:checked ~ label {
    @apply border-transparent bg-blue;
    animation: jelly 600ms #{$dely}ms ease forwards;
  }

  ##{$id}:checked ~ label:after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }

  @keyframes jelly {
    30% {
      transform: scale(1.25, 0.75);
    }

    40% {
      transform: scale(0.75, 1.25);
    }

    50% {
      transform: scale(1.15, 0.85);
    }

    65% {
      transform: scale(0.95, 1.05);
    }

    75% {
      transform: scale(1.05, 0.95);
    }

    to {
      transform: scale(1, 1);
    }
  }
}
</style>