<template>
  <section>
    <BaseAlert :message="alertMessage" />
    <base-model title="Filter" :showModle="zaba" @close-modle="closeModle">
      <ProductsFilter @change-filter="setFilters" />
    </base-model>
    <!-- Filter and Search Actions-->
    <div class="flex justify-between items-center pb-4 border-b border-border">
      <base-button @click="zaba = true" :disabled="checkePproducts">
        <div class="btn-content">
          filters
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
            />
          </svg>
        </div>
      </base-button>
      <div
        class="search-container w-[41.6px] h-[41.6px] bg-seconder flex rounded-[10px] items-center border border-border"
        :class="{'act':searchIsAct}"
      >
        <button
          class="btn-search rounded-[10px] w-[41.6px] h-full border-0"
          @click="handledSearchAct"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon w-[40px] h-[40px] pointer-events-none"
            fill="currentColor"
          >
            <path
              d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
            />
          </svg>
        </button>
        <input
          placeholder="Search for product..."
          class="input-search w-[80%] border-0 pl-2 bg-transparent hidden focus:shadow-none"
          type="text"
          autocomplete="off"
          v-model="searchInput"
          tabindex="-1"
          @input="inputWatch"
        />
        <svg
          @click="clearInputSearch"
          v-if="searchInput"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="clear-input mr-2 cursor-pointer"
        >
          <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <!-- end -->
    <div class="mt-4 flex justify-between">
      <base-button hover="green" @click="handledOpenModel">
        <div class="btn-content">
          Add Product
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              class="pointer-events-none"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </base-button>
      <base-button hover="red" :disabled="checkePproducts">
        <div class="btn-content" @click="handledDeleteAll">
          delete all ({{ products.length }})
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </div>
      </base-button>
    </div>
    <AddProducts
      :open-add="openAdd"
      :update-mode="updateMode"
      :update-prod="updateProd"
      @open-add-product="handledCloseModel"
    />
    <div class="table-scroll mt-4 overflow-x-auto">
      <table class="w-full text-left max-md:w-[850px]">
        <thead>
          <tr class="uppercase bg-seconder border-border border border-x-0 [&_th]:p-2 [&_th]:pr-0">
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>TAXES</th>
            <th>ads</th>
            <th>discount</th>
            <th>total</th>
            <th>category</th>
            <th class="text-center w-[255.13px]">actions</th>
          </tr>
        </thead>
        <tbody ref="dataTable">
          <productsData
            v-for="prod in productsPage"
            :key="prod.id"
            :id="prod.id"
            :title="prod.title"
            :price="prod.price"
            :taxes="prod.taxes"
            :ads="prod.ads"
            :discount="prod.discount"
            :total="prod.total"
            :category="prod.category"
            :date="prod.date"
            @update-btn="handledUpdate"
            @alert-delete="handledAlertDeleted"
          />
        </tbody>
      </table>
      <!-- alert => no data in database -->
      <div v-if="checkePproducts" class="alert-product-mess">
        <h1>No products in database</h1>
      </div>
      <div v-if="productsPage.length === 0 && products.length > 0" class="alert-product-mess">
        <h1>Opps no product found</h1>
      </div>
    </div>
    <div ref="placeholderTable" class="bg-yellow-500"></div>
    <div ref="placeholderTable2" class="bg-black"></div>
    <div class="flex justify-between items-center mt-9">
      <div class="flex gap-1 items-center">
        showing
        <span class="showing">{{ productsPage.length }}</span>
        to
        <span class="showing">{{ products.length }}</span>
        of
        <span class="showing">{{ bullets }}</span>
        entries
      </div>
      <div class="flex gap-4">
        <base-button
          title="prev"
          :disabled="checkePproducts || currentPage === 1"
          @click="handleBtnPrev"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        </base-button>
        <ul class="paginations flex gap-2">
          <li
            v-for="bullet in bullets"
            :key="bullet"
            :class="{'act':bullet === currentPage}"
            @click="handleBullets(bullet)"
          >{{ bullet }}</li>
        </ul>
        <base-button
          title="next"
          @click="handleBtnNext"
          :disabled="checkePproducts || currentPage === bullets"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
          </svg>
        </base-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";

import productsData from "../components/productsData.vue";
import ProductsFilter from "../components/ProductsFilter.vue";
import AddProducts from "../components/AddProducts.vue";

import { CategorysBoo, Products } from "../types/interfaces";

export default defineComponent({
  components: {
    productsData,
    ProductsFilter,
    AddProducts,
  },
  emits: ["openAddProduct"],
  setup() {
    type objOfProd = Products["products"];

    const store = useStore();

    const products = computed<objOfProd>(() => store.getters.products);
    const checkePproducts = computed<objOfProd>(
      () => store.getters.checkePproducts
    );
    const searchIsAct = ref<boolean>(false);
    const zaba = ref<boolean>(false);
    const openAdd = ref<boolean>(false);
    const updateMode = ref<boolean>(false);
    const updateProd = ref<string>("");
    const searchInput = ref<string>("");
    const alertMessage = ref<string>("");
    const filters = ref<CategorysBoo>({
      phone: true,
      tv: true,
      laptop: true,
      watch: true,
    });

    let q = ref();

    const closeModle = () => (zaba.value = false);

    const setFilters = (updatedFilters: CategorysBoo) => {
      filters.value = updatedFilters;
      if (Object.values(filters.value).some((value) => value === false)) {
        (q.value as unknown as HTMLTableElement).style.display = "none";
      } else {
        (q.value as unknown as HTMLTableElement).style.display = "block";
      }
    };

    // MODEL
    const handledOpenModel = () => {
      openAdd.value = true;
      updateMode.value = false;
    };

    const handledCloseModel = () => {
      openAdd.value = false;
      updateMode.value = false;
    };

    const handledUpdate = (id: string) => {
      updateProd.value = id;
      updateMode.value = true;
      openAdd.value = true;
    };

    // PRODUCTS FILTER
    const filterProducts = computed<objOfProd>(() => {
      return products.value.filter((prod) => {
        if (filters.value.phone && prod.category.includes("phone")) return true;

        if (filters.value.tv && prod.category.includes("tv")) return true;

        if (filters.value.watch && prod.category.includes("watch")) return true;

        if (filters.value.laptop && prod.category.includes("laptop"))
          return true;

        return false;
      });
    });

    // PRODUCTS SEARCH
    const searchProducts = computed<objOfProd>(() => {
      return filterProducts.value.filter((prod) => {
        return prod.title
          .toLowerCase()
          .startsWith(searchInput.value.toLowerCase());
      });
    });

    // DOM
    const dataTable = ref<HTMLElement>();
    const placeholderTable = ref<HTMLElement>();
    const placeholderTable2 = ref<HTMLDivElement>();

    q = placeholderTable2;

    const inputWatch = () => tableHeightControl();

    const computedStyle = (): number => {
      return parseFloat(
        window
          .getComputedStyle(dataTable.value as unknown as HTMLTableElement)
          .height.split("px")
          .join("")
      );
    };

    function tableHeightControl() {
      const computedHeight = computedStyle();
      const hi = placeholderTable2.value as unknown as HTMLDivElement;
      const placeHolderElement =
        placeholderTable.value as unknown as HTMLDivElement;

      let calcHeight: number = 446.4 - computedHeight;

      if (searchInput.value === "") {
        placeHolderElement.style.height = "0";
        hi.style.height = 446.4 - computedHeight + "px";
      } else {
        placeHolderElement.style.height = calcHeight.toString() + "px";
        hi.style.height = "0";
      }

      if (
        (productsPage.value.length === 0 && products.value.length > 0) ||
        checkePproducts.value
      ) {
        placeHolderElement.style.height = "0";
        hi.style.height = "0";
      }
    }

    onUpdated(() => {
      const computedHeight = computedStyle();
      const placeHolderHeight =
        placeholderTable2.value as unknown as HTMLDivElement;
      let newHeight = 446.4 - computedHeight + "px";
      placeHolderHeight.style.height = newHeight;
      if (checkePproducts.value) placeHolderHeight.style.height = "0";
    });

    onMounted(() => {
      tableHeightControl();

      document.addEventListener("click", (e: Event) => {
        const inputSearch =
          (e.target as HTMLDivElement).matches(".search-container") ||
          (e.target as HTMLInputElement).matches(".input-search") ||
          (e.target as HTMLButtonElement).matches(".btn-search") ||
          (e.target as SVGElement).matches(".clear-input");

        if (inputSearch === false) {
          searchIsAct.value = false;
          searchInput.value = "";

          const placeholderHeight =
            placeholderTable.value as unknown as HTMLDivElement;
          if (placeholderHeight == null) return;
          placeholderHeight.style.height = "0";
        }
      });
    });

    const handledSearchAct = () => (searchIsAct.value = !searchIsAct.value);
    const clearInputSearch = () => {
      searchInput.value = "";
      inputWatch();
    };

    // PAGINATION
    const maxProdInPage = 6;
    const currentPage = ref<number>(1);

    const handleBtnPrev = () => {
      if (currentPage.value <= bullets.value) currentPage.value--;
    };

    const handleBullets = (page: number) => (currentPage.value = page);

    const handleBtnNext = () => {
      if (currentPage.value < bullets.value) currentPage.value++;
    };

    const bullets = computed<number>(() =>
      Math.ceil(searchProducts.value.length / maxProdInPage)
    );

    const productsPage = computed<objOfProd>(() => {
      const startIndex = (currentPage.value - 1) * maxProdInPage;
      const endIndex = startIndex + maxProdInPage;

      return searchProducts.value.slice(startIndex, endIndex);
    });
    const alertDeleteMess = ref<string>("");

    // DELETE ALL PRODUCTS
    const handledDeleteAll = async () => {
      if (checkePproducts.value) return;
      await store.dispatch("delteAll");
      alertMessage.value = "All Products Removed";
      setTimeout(() => (alertMessage.value = ""), 3000);
    };

    const handledAlertDeleted = (alert: string) => {
      alertMessage.value = alert;
      setTimeout(() => (alertMessage.value = ""), 3000);
    };

    // LOAD PRODUCTS FROM DATABASE
    const loadProductsData = async () => {
      await store.dispatch("fetchProducts");
    };

    loadProductsData();
    return {
      // VAR
      products,
      checkePproducts,
      searchIsAct,
      zaba,
      placeholderTable2,
      openAdd,
      updateMode,
      updateProd,
      searchInput,
      dataTable,
      placeholderTable,
      currentPage,
      productsPage,
      alertMessage,
      alertDeleteMess,
      // COMPUTED
      filterProducts,
      searchProducts,
      bullets,
      // METHODS
      closeModle,
      handledOpenModel,
      handledCloseModel,
      setFilters,
      handledSearchAct,
      clearInputSearch,
      inputWatch,
      handleBtnPrev,
      handleBtnNext,
      handleBullets,
      handledDeleteAll,
      handledUpdate,
      handledAlertDeleted,
    };
  },
});
</script>

<style scoped lang="scss">
.search-container {
  transition: width 500ms ease-out;
  &.act {
    width: 260px;
  }
  .input-search {
    transition: width 500ms ease-out;
  }
  &.act .input-search {
    display: block;
  }
}
.table-scroll::-webkit-scrollbar {
  @apply h-2 bg-seconder;
}
.table-scroll::-webkit-scrollbar-thumb {
  @apply h-2 bg-border;
}
.alert-product-mess {
  @apply h-[446.4px] grid place-items-center 
  border-border border-b;
}
.showing {
  @apply bg-seconder rounded px-2 py-1 border border-border;
}
.paginations {
  li {
    @apply w-[41.6px] h-[41.6px] rounded cursor-pointer border 
    border-border bg-seconder grid place-items-center transition;

    &.act {
      @apply bg-blue text-white;
    }

    &:hover {
      @apply bg-blue text-white;
    }
  }
}
</style>