import { ActionContext } from 'vuex';
import { Products, ProductsObj } from "@/types/interfaces"

const LOACLHOST_KEY = 'http://localhost:3000/products-table'

export default {
  async addProducts(context: ActionContext<Products, any>, payload: ProductsObj) {

    const data = {
      id: payload.id,
      title: payload.title,
      price: payload.price,
      taxes: payload.taxes,
      ads: payload.ads,
      discount: payload.discount,
      total: payload.total,
      category: payload.category,
      date: Date.now()
    }

    const req = await fetch(LOACLHOST_KEY, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(data)
    })

    const postData = await req.json()

    if (!req.ok) {
      const error = new Error(postData.message || 'File to POST Data')
      throw error
    }


    context.commit('setAddProducts', data)
  },
  async fetchProducts(context: ActionContext<Products, any>) {
    const req = await fetch(LOACLHOST_KEY)
    const fetchData = await req.json();

    if (!req.ok) {
      const error = Error(fetchData.message || 'Failed to fetch Data');
      throw error;
    }

    const products: Products[ 'products' ] = []

    for (const key in fetchData.products) {
      const data = {
        id: fetchData.products[ key ].id,
        title: fetchData.products[ key ].title,
        price: fetchData.products[ key ].price,
        taxes: fetchData.products[ key ].taxes,
        ads: fetchData.products[ key ].ads,
        discount: fetchData.products[ key ].discount,
        total: fetchData.products[ key ].total,
        category: fetchData.products[ key ].category,
        date: fetchData.products[ key ].date,
      }

      products.push(data)
    }

    context.commit('setFetchProducts', products)
  },
  async deleteProducts(context: ActionContext<Products, any>, id: string) {
    const req = await fetch(`${ LOACLHOST_KEY }/${ id }`, {
      headers: { "Content-Type": "application/json" },
      method: 'DELETE'
    })

    const deletedData = await req.json();

    if (!req.ok) {
      const error = new Error(deletedData.message || 'File to DELETE Data')
      throw error
    }

    context.commit('setDeleteProducts', id);
  },
  async delteAll(context: ActionContext<Products, any>) {
    const req = await fetch(`${ LOACLHOST_KEY }/products`, {
      headers: { "Content-Type": "application/json" },
      method: 'DELETE'
    })

    const allDeletedData = await req.json();

    if (!req.ok) {
      const error = new Error(allDeletedData.message || 'File to DELETE All Data')
      throw error
    }

    context.commit('setDeleteAll', []);
  },
  async updateProduct(context: ActionContext<Products, any>, payload: ProductsObj) {
    const req = await fetch(`${ LOACLHOST_KEY }/${ payload.id }`, {
      headers: { "Content-Type": "application/json" },
      method: 'PUT',
      body: JSON.stringify(payload)
    })

    const updatedData = await req.json()

    if (!req.ok) {
      const error = new Error(updatedData.message || 'File to Update Data')
      throw error
    }

    context.commit('setUpdateProduct', payload)
  }
}
