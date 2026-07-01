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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
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
  padding: 0 32px;
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-left .navbar-brand {
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.navbar-right a {
  font-size: 15px;
  color: #555;
  transition: all 0.3s;
  padding: 8px 16px;
  border-radius: 8px;
  position: relative;
}

.navbar-right a:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.06);
}

.navbar-right a.active {
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.user-name {
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 8px 16px;
  background-color: rgba(102, 126, 234, 0.06);
  border-radius: 8px;
}

.btn-logout {
  padding: 8px 20px;
  background: transparent;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-logout:hover {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);
}

/* 主内容区域 */
.main-content {
  min-height: calc(100vh - 64px);
  padding: 24px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 通用滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d0d0d0;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}

/* 通用按钮基础样式 */
button {
  font-family: inherit;
}
</style>