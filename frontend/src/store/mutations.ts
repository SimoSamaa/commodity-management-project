import { Products, ProductsObj } from "@/types/interfaces"

export default {
  setAddProducts(state: Products, payload: ProductsObj) {

    state.products.push(payload)
  },
  setFetchProducts(state: Products, payload: Products[ 'products' ]) {
    state.products = payload;
  },
  setDeleteProducts(state: Products, id: string) {
    state.products = state.products.filter((prod) => prod.id !== id);
  },
  setDeleteAll(state: Products) {
    state.products = [];
  },
  setUpdateProduct(state: Products, prodUpdated: ProductsObj) {
    state.products = state.products.map((prod) => prod.id === prodUpdated.id ? prodUpdated : prod)
  },
  setAlertMessage(state: any, message: any) {
    state.zaba = message;
  }
}