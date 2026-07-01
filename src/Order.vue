<template>
  <div class="order-container">
    <div v-if="!orderSuccess">
      <div class="order-header">
        <h2>📋 订单确认</h2>
        <p class="order-subtitle">请确认您的订单信息</p>
      </div>
      <div v-if="cart.length > 0">
        <div class="order-items">
          <div v-for="item in cart" :key="item.dish.id" class="order-item">
            <img :src="item.dish.img" :alt="item.dish.name" class="order-item-img" />
            <div class="order-item-info">
              <span class="order-item-name">{{ item.dish.name }}</span>
              <span class="order-item-price">¥{{ item.dish.price }}</span>
            </div>
            <span class="order-item-qty">× {{ item.quantity }}</span>
            <span class="order-item-subtotal">¥{{ (item.dish.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <div class="order-divider"></div>
        <div class="order-summary">
          <div class="summary-row">
            <span>商品数量</span>
            <span>{{ cartTotalCount }} 件</span>
          </div>
          <div class="summary-row total-row">
            <span>应付总额</span>
            <span class="total-price">¥{{ cartTotalPrice.toFixed(2) }}</span>
          </div>
        </div>
        <button @click="submitOrder" class="btn-pay">
          <span class="btn-pay-icon">💳</span>
          确认支付 ¥{{ cartTotalPrice.toFixed(2) }}
        </button>
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">🛒</div>
        <p>购物车为空，无法结算。</p>
        <router-link to="/" class="btn-back-home">去首页选购</router-link>
      </div>
    </div>
    <div v-else class="success-page">
      <div class="success-animation">
        <div class="success-icon">✓</div>
      </div>
      <h2 class="success-title">支付成功！</h2>
      <p class="success-desc">感谢您的购买，祝您用餐愉快！</p>
      <div class="success-actions">
        <router-link to="/" class="btn-back-home">🏠 返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'OrderView',
  data() {
    return { orderSuccess: false }
  },
  computed: { ...mapState(['cart']), ...mapGetters(['cartTotalCount', 'cartTotalPrice']) },
  methods: {
    ...mapMutations(['CLEAR_CART']),
    submitOrder() {
      alert('🎉 支付成功！')
      this.CLEAR_CART()
      this.orderSuccess = true
    }
  }
}
</script>

<style scoped>
.order-container {
  max-width: 640px;
  margin: 30px auto;
  padding: 0;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.order-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  text-align: center;
  color: white;
}

.order-header h2 {
  font-size: 24px;
  margin-bottom: 6px;
}

.order-subtitle {
  font-size: 14px;
  opacity: 0.85;
  margin: 0;
}

.order-items {
  padding: 20px;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 14px 0;
  gap: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.order-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-item-name {
  font-weight: 600;
  font-size: 15px;
  color: #333;
}

.order-item-price {
  font-size: 13px;
  color: #999;
}

.order-item-qty {
  color: #666;
  font-size: 14px;
  min-width: 40px;
  text-align: center;
}

.order-item-subtotal {
  font-weight: 600;
  color: #f56c6c;
  min-width: 80px;
  text-align: right;
}

.order-divider {
  height: 8px;
  background: #f8f9fa;
  margin: 0 20px;
  border-radius: 4px;
}

.order-summary {
  padding: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 15px;
  color: #666;
}

.total-row {
  padding-top: 14px;
  border-top: 2px dashed #eee;
  margin-top: 6px;
}

.total-row span:first-child {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.total-price {
  font-size: 24px;
  font-weight: 700;
  color: #f56c6c;
}

.btn-pay {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: calc(100% - 40px);
  margin: 0 20px 24px;
  padding: 16px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);
}

.btn-pay:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);
}

.btn-pay:active {
  transform: translateY(0);
}

.btn-pay-icon {
  font-size: 22px;
}

/* Success Page */
.success-page {
  padding: 60px 40px;
  text-align: center;
}

.success-animation {
  margin-bottom: 24px;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
  font-size: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 8px 25px rgba(67, 233, 123, 0.4);
  animation: successPop 0.6s ease;
}

@keyframes successPop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.success-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.success-desc {
  font-size: 16px;
  color: #999;
  margin-bottom: 36px;
}

.success-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-state p {
  color: #999;
  margin-bottom: 20px;
}

.btn-back-home {
  display: inline-block;
  padding: 12px 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-back-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
</style>