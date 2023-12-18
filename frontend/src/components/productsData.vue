<template>
  <tr :title="productDate">
    <td>{{ id }}</td>
    <td>{{ title }}</td>
    <td>{{ price }}</td>
    <td>{{ taxes }}</td>
    <td>{{ ads }}</td>
    <td>{{ checkDiscount }}</td>
    <td>{{ total }}</td>
    <td>{{ category }}</td>
    <td class="flex gap-2 mr-2">
      <base-button hover="blue" @click="handledUpdate(id)">
        <div class="btn-content">
          update
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      </base-button>
      <base-button hover="red" @click="handledDelete(id)">
        <div class="btn-content">
          delete
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </base-button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  emits: ["update-btn", "alert-delete"],
  props: [
    "id",
    "title",
    "price",
    "taxes",
    "ads",
    "discount",
    "total",
    "category",
    "date",
  ],

  setup(props, { emit }) {
    const store = useStore();

    const checkDiscount = computed<string>(() =>
      props.discount === "" ? "no discount" : props.discount
    );

    const handledUpdate = (id: string) => {
      emit("update-btn", id);
    };

    const handledDelete = async (id: string) => {
      emit("alert-delete", "Product Removed!!");
      await store.dispatch("deleteProducts", id);
    };

    const productDate = computed<string>(() => {
      const fullDate = new Date(parseInt(props.date));
      return `${fullDate.getMonth() + 1}/${fullDate.getDate()}/${fullDate
        .getFullYear()
        .toString()
        .slice(-2)}
      `;
    });

    return {
      checkDiscount,
      productDate,
      handledUpdate,
      handledDelete,
    };
  },
});
</script>

<style scoped lang="scss">
tr {
  @apply bg-seconder border-border border border-x-0;

  &:nth-child(odd) {
    @apply bg-transparent;
  }

  td {
    @apply py-4 p-2 pr-0;
  }
}
</style>