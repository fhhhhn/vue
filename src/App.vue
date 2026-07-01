<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="navbar-left">
        <router-link to="/" class="navbar-brand">美食订餐</router-link>
      </div>
      <nav class="navbar-right">
        <router-link to="/" exact-active-class="active">首页</router-link>
        <router-link to="/cart" exact-active-class="active">购物车</router-link>
        <template v-if="isLoggedIn">
          <span class="user-name">{{ user.username }}</span>
          <button @click="handleLogout" class="btn-logout">退出</button>
        </template>
        <template v-else>
          <router-link to="/login" exact-active-class="active">登录</router-link>
        </template>
      </nav>
    </header>

    <!-- 主要内容区域，渲染当前路由组件 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['user']),
    isLoggedIn() {
      return this.user !== null
    }
  },
  methods: {
    ...mapMutations(['LOGOUT']),
    handleLogout() {
      this.LOGOUT()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f5f6fa;
  color: #333;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-left .navbar-brand {
  font-size: 22px;
  font-weight: 700;
  color: #409eff;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar-right a {
  font-size: 15px;
  color: #555;
  transition: color 0.2s;
  padding: 6px 0;
  border-bottom: 2px solid transparent;
}

.navbar-right a:hover,
.navbar-right a.active {
  color: #409eff;
  border-bottom-color: #409eff;
}

.user-name {
  font-weight: 500;
  color: #409eff;
  margin-right: 4px;
}

.btn-logout {
  padding: 6px 16px;
  background: transparent;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: background 0.2s, color 0.2s;
}

.btn-logout:hover {
  background: #f56c6c;
  border-color: #f56c6c;
  color: white;
}

/* 主内容区域 */
.main-content {
  min-height: calc(100vh - 60px);
  padding: 20px;
}
</style>