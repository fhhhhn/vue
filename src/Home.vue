<template>
  <div class="home-container">
    <div class="home-hero">
      <h1 class="hero-title">🍽️ 美食天地</h1>
      <p class="hero-sub">精选美味，即刻送达</p>
    </div>
    <div class="dish-grid">
      <div v-for="dish in dishes" :key="dish.id" class="dish-card">
        <router-link :to="{ name: 'Detail', params: { id: dish.id } }" class="dish-link">
          <div class="dish-image-wrap">
            <img :src="dish.img" :alt="dish.name" class="dish-image" />
            <div class="dish-overlay">
              <span class="view-detail">查看详情</span>
            </div>
          </div>
        </router-link>
        <div class="dish-info">
          <div class="dish-name-row">
            <h3 class="dish-name">{{ dish.name }}</h3>
            <span class="dish-price">¥{{ dish.price }}</span>
          </div>
          <p class="dish-desc">{{ dish.desc }}</p>
          <button @click="addToCart(dish)" class="btn-add-cart">
            <span class="cart-icon">🛒</span>
            加入购物车
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'HomeView',
  computed: {
    ...mapState(['dishes'])
  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
    addToCart(dish) {
      this.ADD_TO_CART(dish)
      this.$router.push({ name: 'Cart' })
    }
  }
}
</script>

<style scoped>
.home-hero {
  text-align: center;
  padding: 40px 20px 30px;
}

.hero-title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.hero-sub {
  font-size: 16px;
  color: #999;
  font-weight: 400;
}

.dish-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  padding: 0 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.dish-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.dish-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.dish-link {
  display: block;
  text-decoration: none;
}

.dish-image-wrap {
  position: relative;
  overflow: hidden;
  height: 220px;
}

.dish-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.dish-card:hover .dish-image {
  transform: scale(1.08);
}

.dish-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.dish-card:hover .dish-overlay {
  opacity: 1;
}

.view-detail {
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 20px;
  border: 2px solid white;
  border-radius: 24px;
  backdrop-filter: blur(4px);
  transition: all 0.3s;
}

.view-detail:hover {
  background: white;
  color: #333;
}

.dish-info {
  padding: 18px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dish-name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.dish-name {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.dish-price {
  font-size: 20px;
  font-weight: 800;
  color: #f56c6c;
}

.dish-desc {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
  margin: 0 0 16px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}

.btn-add-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
}

.btn-add-cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(102, 126, 234, 0.35);
}

.btn-add-cart:active {
  transform: translateY(0);
}

.cart-icon {
  font-size: 16px;
}
</style>
