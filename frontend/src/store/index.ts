import { createStore, Store } from 'vuex'

import mutationProduct from './mutations'
import actionProduct from './actions'
import getterProduct from './getters'

import { Products } from '../types/interfaces'

const store: Store<Products> = createStore({
  state() {
    return {
      products: []
    }
  },
  mutations: mutationProduct,
  actions: actionProduct,
  getters: getterProduct,
})

export default store