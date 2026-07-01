<template>
  <div class="detail-container" v-if="dish">
    <img :src="dish.img" :alt="dish.name" class="detail-image" />
    <div class="detail-info">
      <h1>{{ dish.name }}</h1>
      <p class="desc">{{ dish.desc }}</p>
      <p class="price">¥{{ dish.price }}</p>
      <button @click="addToCartAndGo" class="btn-primary">加入购物车</button>
    </div>
  </div>
  <div v-else class="loading">加载中...</div>
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
.detail-container { display: flex; max-width: 900px; margin: 40px auto; gap: 40px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
.detail-image { width: 400px; height: 300px; object-fit: cover; border-radius: 8px; }
.detail-info { flex: 1; }
.desc { color: #666; line-height: 1.6; }
.price { font-size: 28px; color: #f56c6c; font-weight: bold; }
.btn-primary { padding: 12px 40px; background: #409eff; color: white; border: none; border-radius: 4px; font-size: 18px; cursor: pointer; }
</style>