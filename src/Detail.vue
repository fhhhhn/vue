<template>
  <div class="detail-page" v-if="dish">
    <div class="detail-container">
      <div class="detail-image-wrap">
        <img :src="dish.img" :alt="dish.name" class="detail-image" />
      </div>
      <div class="detail-info">
        <div class="detail-tag">今日推荐</div>
        <h1 class="detail-name">{{ dish.name }}</h1>
        <p class="detail-desc">{{ dish.desc }}</p>
        <div class="detail-meta">
          <div class="meta-item">
            <span class="meta-label">价格</span>
            <span class="detail-price">¥{{ dish.price }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">月销量</span>
            <span class="meta-value">998+</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">评分</span>
            <span class="meta-value meta-star">⭐ 4.9</span>
          </div>
        </div>
        <div class="detail-actions">
          <button @click="addToCartAndGo" class="btn-add-cart-detail">
            <span>🛒</span>
            加入购物车
          </button>
          <router-link to="/" class="btn-back">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading-state">
    <div class="loading-spinner"></div>
    <p>加载中...</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DetailView',
  computed: {
    ...mapState(['dishes']),
    dish() {
      const id = Number(this.$route.params.id)
      return this.dishes.find(d => d.id === id)
    }
  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
    addToCartAndGo() {
      this.ADD_TO_CART(this.dish)
      // 加入购物车后跳转到购物车页面
      this.$router.push({ name: 'Cart' })
    }
  }
}
</script>

<style scoped>
.detail-page {
  padding: 20px;
  min-height: calc(100vh - 64px - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-container {
  display: flex;
  max-width: 960px;
  width: 100%;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-image-wrap {
  width: 45%;
  min-height: 400px;
  overflow: hidden;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s;
}

.detail-image-wrap:hover .detail-image {
  transform: scale(1.05);
}

.detail-info {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.detail-tag {
  display: inline-block;
  padding: 4px 14px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 16px;
  align-self: flex-start;
}

.detail-name {
  font-size: 32px;
  font-weight: 800;
  color: #333;
  margin-bottom: 12px;
}

.detail-desc {
  font-size: 15px;
  color: #888;
  line-height: 1.8;
  margin-bottom: 28px;
}

.detail-meta {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  padding: 20px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-label {
  font-size: 13px;
  color: #bbb;
}

.meta-value {
  font-size: 16px;
  color: #666;
}

.detail-price {
  font-size: 32px;
  font-weight: 800;
  color: #f56c6c;
}

.meta-star {
  font-size: 16px;
}

.detail-actions {
  display: flex;
  gap: 14px;
}

.btn-add-cart-detail {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-add-cart-detail:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 28px;
  background: #f5f7fa;
  color: #666;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-back:hover {
  background: #eee;
  color: #333;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #999;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>