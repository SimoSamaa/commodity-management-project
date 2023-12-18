import { ActionContext } from 'vuex';
import { Products, ProductsObj } from "@/types/interfaces"

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

    const req = await fetch(`http://localhost:3000/products-table`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(data)
    })


    context.commit('setAddProducts', data)
  },
  async fetchProducts(context: ActionContext<Products, any>) {
    const req = await fetch(`http://localhost:3000/products-table`)
    const reqData = await req.json();

    if (!req.ok) {
      const error = Error(reqData.message || 'Failed to fetch');
      throw error;
    }

    const products: Products[ 'products' ] = []

    for (const key in reqData.products) {
      const data = {
        id: reqData.products[ key ].id,
        title: reqData.products[ key ].title,
        price: reqData.products[ key ].price,
        taxes: reqData.products[ key ].taxes,
        ads: reqData.products[ key ].ads,
        discount: reqData.products[ key ].discount,
        total: reqData.products[ key ].total,
        category: reqData.products[ key ].category,
        date: reqData.products[ key ].date,
      }

      products.push(data)
    }

    context.commit('setFetchProducts', products)
  },
  async deleteProducts(context: ActionContext<Products, any>, id: string) {
    const req = await fetch(`http://localhost:3000/products-table/${ id }`, {
      headers: { "Content-Type": "application/json" },
      method: 'DELETE'
    })

    context.commit('setDeleteProducts', id);
  },
  async delteAll(context: ActionContext<Products, any>) {
    const req = await fetch(`http://localhost:3000/products-table/products`, {
      headers: { "Content-Type": "application/json" },
      method: 'DELETE'
    })
    context.commit('setDeleteAll', []);
  },
  async updateProduct(context: ActionContext<Products, any>, payload: ProductsObj) {
    const req = await fetch(`http://localhost:3000/products-table/${ payload.id }`, {
      headers: { "Content-Type": "application/json" },
      method: 'PUT',
      body: JSON.stringify(payload)
    })
    context.commit('setUpdateProduct', payload)
  }
}
