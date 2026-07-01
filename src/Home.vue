<template>
  <div class="home-container">
    <div class="dish-grid">
      <div v-for="dish in dishes" :key="dish.id" class="dish-card">
        <!-- 点击图片跳转详情页 -->
        <router-link :to="{ name: 'Detail', params: { id: dish.id } }">
          <img :src="dish.img" :alt="dish.name" class="dish-image" />
        </router-link>
        <div class="dish-info">
          <h3>{{ dish.name }}</h3>
          <p class="price">¥{{ dish.price }}</p>
        </div>
        <!-- 鼠标划过显示添加购物车按钮 -->
        <div class="card-overlay">
          <button @click="addToCart(dish)" class="btn-add-cart">加入购物车</button>
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
      // 可选：提示或直接跳转到购物车
      this.$router.push({ name: 'Cart' })
    }
  }
}
</script>

<style scoped>
.dish-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 20px; max-width: 1200px; margin: 0 auto; }
.dish-card { background: white; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s; }
.dish-card:hover { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.dish-image { width: 100%; height: 200px; object-fit: cover; display: block; }
.dish-info { padding: 12px 16px; }
.dish-info h3 { margin: 0 0 8px; font-size: 18px; }
.price { color: #f56c6c; font-weight: bold; font-size: 20px; margin: 0; }
.card-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
.dish-card:hover .card-overlay { opacity: 1; }
.btn-add-cart { padding: 10px 20px; background: #409eff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
.btn-add-cart:hover { background: #66b1ff; }
</style>
