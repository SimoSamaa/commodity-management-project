<template>
  <section>
    <BaseAlert :message="alertMessage" />
    <Teleport to="body">
      <transition name="backdrop">
        <div class="fixed inset-0 bg-[#000000b3]" v-if="openAdd" @click="openAddProduct"></div>
      </transition>
      <transition name="add">
        <div
          v-if="openAdd"
          class="fixed p-4 bg-bg left-1/2 top-0 -translate-x-1/2 w-[800px] max-w-[90%] rounded-b"
        >
          <div class="flex justify-between mb-4 border-border border-b pb-4">
            <h2>{{ updateMode ? 'Update' : 'Add' }} Products</h2>
            <div class="close-btn" @click="openAddProduct">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <form @submit.prevent="submitProductForm">
            <div class="grid grid-cols-2 gap-4">
              <input
                class="inputs"
                :class="{'input-error': !inputsProduct.title.isValid}"
                type="text"
                placeholder=" Title"
                v-model.trim="inputsProduct.title.value"
              />
              <input
                class="inputs"
                :class="{'input-error': !inputsProduct.price.isValid}"
                type="number"
                placeholder="Price"
                v-model.number="inputsProduct.price.value"
              />
              <input
                class="inputs"
                :class="{'input-error': !inputsProduct.taxes.isValid}"
                type="number"
                placeholder="taxes"
                v-model.number="inputsProduct.taxes.value"
              />
              <input
                class="inputs"
                :class="{'input-error': !inputsProduct.ads.isValid}"
                type="number"
                placeholder="Ads"
                v-model.number="inputsProduct.ads.value"
              />
              <input
                class="inputs"
                type="number"
                placeholder="Discount"
                v-model.number="inputsProduct.discount.value"
              />
              <input
                class="inputs"
                type="number"
                placeholder="Count"
                v-model.number="inputsProduct.count.value"
              />
            </div>
            <div class="grid my-4">
              <label for="category" class="mb-2">Category</label>
              <select v-model="inputsProduct.category.value" class="h-10 pl-3">
                <option
                  v-for="category in categorys"
                  :key="category"
                  :value="category"
                >{{ category }}</option>
              </select>
            </div>
            <p
              v-if="!formValidation"
              class="text-red mb-4 font-semibold transition-all"
            >{{ formErrMess }}</p>
            <div class="flex justify-between items-center">
              <div class="flex gap-4">
                <base-button type="submit" hover="green" @click="clearTimeOutBtn">
                  <div class="btn-content">
                    {{ updateMode ? 'update' : 'save' }}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                      />
                    </svg>
                  </div>
                </base-button>
                <base-button type="reset" hover="blue">
                  <div class="btn-content">
                    reset
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
                      <path
                        d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"
                      />
                    </svg>
                  </div>
                </base-button>
              </div>
              <div
                class="bg-seconder w-fit p-2 rounded border border-border"
              >total: {{ calcProductPrice }}</div>
            </div>
          </form>
        </div>
      </transition>
    </Teleport>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

import { ProductInput, ProductsObj } from "../types/interfaces";

export default defineComponent({
  emits: ["openAddProduct"],
  props: ["openAdd", "updateMode", "updateProd"],
  setup(props, { emit }) {
    const store = useStore();

    const products = computed(() => store.getters.products);
    const categorys = ref<string[]>(["phone", "tv", "laptop", "watch"]);
    const formValidation = ref<boolean>(true);
    const selectedProd = ref<ProductsObj | null>(null);
    const alertMessage = ref<string>("");

    const inputsProduct = reactive<ProductInput>({
      title: {
        value: "",
        isValid: true,
      },
      price: {
        value: "",
        isValid: true,
      },
      taxes: {
        value: "",
        isValid: true,
      },
      ads: {
        value: "",
        isValid: true,
      },
      discount: {
        value: "",
      },
      count: {
        value: "",
      },
      category: {
        value: categorys.value[0],
        isValid: true,
      },
    });

    const openAddProduct = () => emit("openAddProduct");

    const calcProductPrice = computed<number>(() => {
      let totalPrice =
        +inputsProduct.price.value +
        +inputsProduct.taxes.value +
        +inputsProduct.ads.value;
      if (Number.isNaN(totalPrice)) totalPrice = 0;

      return totalPrice - +inputsProduct.discount.value;
    });

    const checkValidationInput = () => {
      formValidation.value = true;

      const { title, price, taxes, ads } = inputsProduct;

      const validateInput = (input: { value: string; isValid: boolean }) => {
        if (input.value === "") {
          input.isValid = false;
          formValidation.value = false;
        }
      };

      validateInput(title);
      validateInput(price);
      validateInput(taxes);
      validateInput(ads);
    };

    const formErrMess = ref<string>("");
    const timeoutId = ref<number | null>();

    const clearTimeOutBtn = () => {
      if (timeoutId.value !== null) {
        clearTimeout(timeoutId.value);
        timeoutId.value = null;
      }
    };

    const resetAllInput = () => {
      inputsProduct.title.value = "";
      inputsProduct.price.value = "";
      inputsProduct.taxes.value = "";
      inputsProduct.ads.value = "";
      inputsProduct.discount.value = "";
      inputsProduct.count.value = "";
      inputsProduct.category.value = categorys.value[0];
    };

    const submitProductForm = async () => {
      checkValidationInput();

      timeoutId.value = setTimeout(() => (formErrMess.value = ""), 3000);
      formErrMess.value = "Please fill the required input";

      if (!formValidation.value) return;

      const latestId = computed<number>(() => {
        if (products.value.length > 0) {
          return (
            Math.max(...products.value.map((prod: ProductsObj) => prod.id)) + 1
          );
        }
        return 1;
      });

      function prodData() {
        const submitData = {
          id: (() =>
            props.updateMode ? selectedProd.value?.id : latestId.value)(),
          title: inputsProduct.title.value,
          price: inputsProduct.price.value,
          taxes: inputsProduct.taxes.value,
          ads: inputsProduct.ads.value,
          discount: inputsProduct.discount.value,
          count: inputsProduct.count.value,
          category: inputsProduct.category.value,
          total: calcProductPrice.value,
        };

        return submitData;
      }

      if (props.updateMode) {
        await store.dispatch("updateProduct", prodData());

        alertMessage.value = "Product Updated";
      } else {
        await store.dispatch("addProducts", prodData());

        for (let i = 1; i < parseInt(inputsProduct.count.value); i++) {
          await store.dispatch("addProducts", prodData());
        }

        alertMessage.value = "Product Adedd";
      }

      openAddProduct();
      resetAllInput();
      setTimeout(() => (alertMessage.value = ""), 3000);
    };

    watch(
      () => props.updateMode,
      () => {
        if (props.updateMode) {
          selectedProd.value = products.value.find(
            (prod: ProductsObj) => prod.id === props.updateProd
          );

          if (!selectedProd.value) return;
          inputsProduct.title.value = selectedProd.value.title;
          inputsProduct.price.value = selectedProd.value.price.toString();
          inputsProduct.taxes.value = selectedProd.value.taxes.toString();
          inputsProduct.ads.value = selectedProd.value.ads.toString();
          inputsProduct.discount.value = !selectedProd.value.discount.toString()
            ? "0"
            : selectedProd.value.discount.toString();
          inputsProduct.category.value = selectedProd.value.category;
        } else {
          resetAllInput();
        }
      }
    );

    return {
      // VARS
      inputsProduct,
      categorys,
      calcProductPrice,
      formValidation,
      formErrMess,
      alertMessage,
      // METHODS
      openAddProduct,
      submitProductForm,
      clearTimeOutBtn,
    };
  },
});
</script>
<style scoped lang="scss">
@import "@/scss/helpers/mixins";
.inputs {
  @apply h-10 pl-4;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;

  &.input-error {
    @apply bg-red;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}

@include animation("backdrop", null, null);
@include animation("add", "add", null);
</style>
