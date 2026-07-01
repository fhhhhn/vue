<template>
  <div class="login-container">
    <div class="login-card">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input v-model="username" type="text" placeholder="请输入用户名 (admin)" required />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input v-model="password" type="password" placeholder="请输入密码 (admin123)" required />
        </div>
        <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
        <button type="submit" class="btn-primary">{{ loading ? '登录中...' : '登录' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMsg: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      this.errorMsg = ''
      this.loading = true
      try {
        await this.login({ username: this.username, password: this.password })
        // 登录成功，跳转到首页或原来想去的页面
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      } catch (error) {
        this.errorMsg = error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* 自行完善样式，使用 flex 水平垂直居中，卡片风格，输入框聚焦边框变化 */
.login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5; }
.login-card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); width: 360px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 500; }
.form-group input { width: 100%; padding: 10px; border: 1px solid #dcdfe6; border-radius: 4px; transition: border-color 0.2s; }
.form-group input:focus { border-color: #409eff; outline: none; }
.btn-primary { width: 100%; padding: 12px; background: #409eff; color: white; border: none; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
.btn-primary:hover { background: #66b1ff; }
.error-message { color: #f56c6c; font-size: 14px; }
</style>