<template>
  <div class="cart-container">
    <h2>购物车</h2>
    <div v-if="cart.length === 0" class="empty-cart">购物车空空的，快去选购美食吧！</div>
    <div v-else class="cart-list">
      <div v-for="item in cart" :key="item.dish.id" class="cart-item">
        <img :src="item.dish.img" :alt="item.dish.name" class="item-image" />
        <div class="item-info">
          <h4>{{ item.dish.name }}</h4>
          <p class="item-price">¥{{ item.dish.price }}</p>
        </div>
        <div class="item-quantity">
          <button @click="updateQuantity(item.dish.id, item.quantity - 1)" class="qty-btn">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="updateQuantity(item.dish.id, item.quantity + 1)" class="qty-btn">+</button>
        </div>
        <p class="item-subtotal">小计：¥{{ (item.dish.price * item.quantity).toFixed(2) }}</p>
        <button @click="removeItem(item.dish.id)" class="btn-remove">删除</button>
      </div>
    </div>
    <div v-if="cart.length > 0" class="cart-summary">
      <p>总数量：{{ cartTotalCount }} 件</p>
      <p>总金额：<span class="total-price">¥{{ cartTotalPrice.toFixed(2) }}</span></p>
      <button @click="goToCheckout" class="btn-primary">去结算</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'CartView',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotalCount', 'cartTotalPrice'])
  },
  methods: {
    ...mapMutations(['UPDATE_CART_ITEM', 'REMOVE_FROM_CART']),
    updateQuantity(dishId, quantity) {
      if (quantity < 1) return // 最少为1
      this.UPDATE_CART_ITEM({ dishId, quantity })
    },
    removeItem(dishId) {
      this.REMOVE_FROM_CART(dishId)
    },
    goToCheckout() {
      this.$router.push({ name: 'Order' })
    }
  }
}
</script>

<style scoped>
.cart-container { max-width: 800px; margin: 40px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
.cart-item { display: flex; align-items: center; padding: 16px 0; border-bottom: 1px solid #eee; gap: 16px; }
.item-image { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; }
.item-info { flex: 1; }
.item-price { color: #f56c6c; font-weight: bold; }
.item-quantity { display: flex; align-items: center; gap: 8px; }
.qty-btn { width: 30px; height: 30px; border: 1px solid #dcdfe6; background: white; border-radius: 4px; cursor: pointer; font-size: 18px; }
.qty-btn:hover { background: #f0f0f0; }
.item-subtotal { width: 100px; text-align: right; font-weight: bold; }
.btn-remove { padding: 6px 12px; background: #f56c6c; color: white; border: none; border-radius: 4px; cursor: pointer; }
.btn-remove:hover { background: #e04040; }
.cart-summary { margin-top: 20px; text-align: right; padding-top: 20px; border-top: 2px solid #eee; }
.total-price { font-size: 24px; color: #f56c6c; font-weight: bold; }
.btn-primary { padding: 12px 40px; background: #409eff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
.empty-cart { text-align: center; padding: 60px 0; color: #999; }
</style>
