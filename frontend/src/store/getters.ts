import { Products } from '../types/interfaces'

export default {
  products(state: Products) {
    return state.products
  },
  checkePproducts(state: Products) {
    return state.products && state.products.length <= 0
  },
} 