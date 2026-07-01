<template>
  <div class="order-container">
    <h2>订单确认</h2>
    <div v-if="cart.length > 0">
      <h3>商品列表</h3>
      <div v-for="item in cart" :key="item.dish.id" class="order-item">
        <span>{{ item.dish.name }} x {{ item.quantity }}</span>
        <span>¥{{ (item.dish.price * item.quantity).toFixed(2) }}</span>
      </div>
      <hr />
      <p class="total">总计：<span class="price">¥{{ cartTotalPrice.toFixed(2) }}</span></p>
      <button @click="submitOrder" class="btn-primary">确认支付</button>
    </div>
    <div v-else-if="orderSuccess" class="success-msg">
      订单支付成功！感谢您的购买！
    </div>
    <div v-else>购物车为空，无法结算。</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'OrderView',
  data() {
    return { orderSuccess: false }
  },
  computed: { ...mapState(['cart']), ...mapGetters(['cartTotalPrice']) },
  methods: {
    ...mapMutations(['LOGOUT']), // 这里只是示例，实际上不应该清除用户
    submitOrder() {
      alert('支付成功！(模拟)')
      this.orderSuccess = true
      // 实际项目中应该清空购物车: this.$store.commit('CLEAR_CART') 需要先在 mutations 定义
    }
  }
}
</script>

<style scoped>
.order-container { max-width: 600px; margin: 40px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
.order-item { display: flex; justify-content: space-between; padding: 8px 0; }
.total { font-size: 20px; font-weight: bold; }
.price { color: #f56c6c; }
.btn-primary { padding: 12px 40px; background: #409eff; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
.success-msg { text-align: center; padding: 60px; color: #67c23a; font-size: 24px; }
</style>