import { createStore } from 'vuex'

export default createStore({
  state: {
    // 用户信息
    user: null,
    // 菜品列表
    dishes: [
      {
        id: 1,
        name: '宫保鸡丁',
        price: 38,
        img: 'https://picsum.photos/seed/dish1/400/300',
        desc: '经典川菜，鸡肉丁与花生米爆炒，麻辣鲜香。'
      },
      {
        id: 2,
        name: '麻婆豆腐',
        price: 28,
        img: 'https://picsum.photos/seed/dish2/400/300',
        desc: '嫩豆腐搭配麻辣肉末，入口即化，麻辣鲜香。'
      },
      {
        id: 3,
        name: '糖醋排骨',
        price: 48,
        img: 'https://picsum.photos/seed/dish3/400/300',
        desc: '外酥里嫩，酸甜可口，老少皆宜。'
      },
      {
        id: 4,
        name: '鱼香肉丝',
        price: 32,
        img: 'https://picsum.photos/seed/dish4/400/300',
        desc: '鱼香风味，肉丝嫩滑，酸甜微辣。'
      },
      {
        id: 5,
        name: '回锅肉',
        price: 36,
        img: 'https://picsum.photos/seed/dish5/400/300',
        desc: '五花肉片搭配蒜苗和豆瓣酱，肥而不腻。'
      },
      {
        id: 6,
        name: '水煮鱼',
        price: 58,
        img: 'https://picsum.photos/seed/dish6/400/300',
        desc: '鲜嫩鱼片在麻辣汤中煮熟，麻辣过瘾。'
      }
    ],
    // 购物车
    cart: []
  },
  getters: {
    cartTotalCount(state) {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0)
    },
    cartTotalPrice(state) {
      return state.cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0)
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    LOGOUT(state) {
      state.user = null
      state.cart = []
    },
    ADD_TO_CART(state, dish) {
      const existing = state.cart.find(item => item.dish.id === dish.id)
      if (existing) {
        existing.quantity++
      } else {
        state.cart.push({ dish, quantity: 1 })
      }
    },
    UPDATE_CART_ITEM(state, { dishId, quantity }) {
      const item = state.cart.find(item => item.dish.id === dishId)
      if (item) {
        item.quantity = quantity
      }
    },
    REMOVE_FROM_CART(state, dishId) {
      state.cart = state.cart.filter(item => item.dish.id !== dishId)
    },
    CLEAR_CART(state) {
      state.cart = []
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      // 模拟登录验证
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin' && password === 'admin123') {
            commit('LOGOUT') // 清除旧状态
            const user = { username: 'admin', nickname: '管理员' }
            commit('SET_USER', user)
            resolve(user)
          } else {
            reject(new Error('用户名或密码错误'))
          }
        }, 500)
      })
    }
  }
})
