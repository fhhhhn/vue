<template>
  <div class="cart-container">
    <div class="cart-header">
      <h2>🛒 购物车</h2>
      <span v-if="cart.length > 0" class="cart-count">{{ cartTotalCount }} 件商品</span>
    </div>
    <div v-if="cart.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <p class="empty-text">购物车空空的</p>
      <p class="empty-sub">快去选购美食吧！</p>
      <router-link to="/" class="btn-go-shop">去首页选购</router-link>
    </div>
    <div v-else class="cart-list">
      <div v-for="item in cart" :key="item.dish.id" class="cart-item">
        <img :src="item.dish.img" :alt="item.dish.name" class="item-image" />
        <div class="item-info">
          <h4 class="item-name">{{ item.dish.name }}</h4>
          <p class="item-price">¥{{ item.dish.price }}</p>
        </div>
        <div class="item-quantity">
          <button @click="updateQuantity(item.dish.id, item.quantity - 1)" class="qty-btn" :disabled="item.quantity <= 1">−</button>
          <span class="qty-num">{{ item.quantity }}</span>
          <button @click="updateQuantity(item.dish.id, item.quantity + 1)" class="qty-btn">+</button>
        </div>
        <div class="item-subtotal">
          <span class="subtotal-label">小计</span>
          <span class="subtotal-price">¥{{ (item.dish.price * item.quantity).toFixed(2) }}</span>
        </div>
        <button @click="removeItem(item.dish.id)" class="btn-remove" title="删除">✕</button>
      </div>
    </div>
    <div v-if="cart.length > 0" class="cart-footer">
      <div class="footer-info">
        <div class="info-row">
          <span>商品数量</span>
          <span class="info-value">{{ cartTotalCount }} 件</span>
        </div>
        <div class="info-row total-row">
          <span>合计</span>
          <span class="total-price">¥{{ cartTotalPrice.toFixed(2) }}</span>
        </div>
      </div>
      <button @click="goToCheckout" class="btn-checkout">去结算</button>
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
.cart-container {
  max-width: 800px;
  margin: 30px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cart-header h2 {
  font-size: 22px;
  font-weight: 700;
}

.cart-count {
  font-size: 14px;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 14px;
  border-radius: 20px;
}

.cart-list {
  padding: 8px 28px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 18px 0;
  gap: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item:hover {
  background: #fafafa;
  margin: 0 -28px;
  padding-left: 28px;
  padding-right: 28px;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.item-price {
  color: #f56c6c;
  font-weight: 700;
  font-size: 16px;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0;
  background: #f5f7fa;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.qty-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.qty-num {
  min-width: 32px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.item-subtotal {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 80px;
  flex-shrink: 0;
}

.subtotal-label {
  font-size: 12px;
  color: #999;
}

.subtotal-price {
  font-weight: 700;
  font-size: 16px;
  color: #f56c6c;
}

.btn-remove {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #ccc;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: #f56c6c;
  color: white;
}

.cart-footer {
  padding: 20px 28px 24px;
  background: #fafbfc;
  border-top: 1px solid #f0f0f0;
}

.footer-info {
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 15px;
  color: #666;
}

.total-row {
  padding-top: 12px;
  border-top: 2px dashed #e0e0e0;
  margin-top: 6px;
}

.total-row span:first-child {
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

.total-price {
  font-size: 26px;
  font-weight: 800;
  color: #f56c6c;
}

.btn-checkout {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  letter-spacing: 2px;
}

.btn-checkout:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-checkout:active {
  transform: translateY(0);
}

/* Empty State */
.empty-cart {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-text {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.empty-sub {
  font-size: 15px;
  color: #999;
  margin-bottom: 28px;
}

.btn-go-shop {
  display: inline-block;
  padding: 12px 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-go-shop:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
</style>
