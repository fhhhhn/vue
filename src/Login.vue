<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="login-icon">🍽️</div>
        <h2 class="login-title">欢迎回来</h2>
        <p class="login-subtitle">登录您的账号以继续</p>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label class="form-label">用户名</label>
          <div class="input-wrap">
            <span class="input-icon">👤</span>
            <input v-model="username" type="text" placeholder="请输入用户名 (admin)" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">密码</label>
          <div class="input-wrap">
            <span class="input-icon">🔒</span>
            <input v-model="password" type="password" placeholder="请输入密码 (admin123)" required />
          </div>
        </div>
        <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="loading" class="btn-loading"></span>
          <span v-else>登 录</span>
          <span v-if="loading">登录中...</span>
        </button>
        <div class="login-footer">
          <router-link to="/" class="back-link">← 返回首页</router-link>
        </div>
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px - 48px);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  width: 400px;
  overflow: hidden;
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 36px 32px 28px;
  text-align: center;
  color: white;
}

.login-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 6px;
}

.login-subtitle {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

.login-form {
  padding: 32px;
}

.form-group {
  margin-bottom: 22px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #555;
}

.input-wrap {
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 0 14px;
  transition: all 0.3s;
}

.input-wrap:focus-within {
  border-color: #667eea;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.input-icon {
  font-size: 16px;
  margin-right: 10px;
}

.input-wrap input {
  width: 100%;
  padding: 14px 0;
  border: none;
  background: transparent;
  font-size: 15px;
  outline: none;
  color: #333;
}

.input-wrap input::placeholder {
  color: #bbb;
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 10px 14px;
  background: #fef0f0;
  border-radius: 8px;
  text-align: center;
}

.btn-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  letter-spacing: 4px;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-loading {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  margin-top: 20px;
  text-align: center;
}

.back-link {
  color: #999;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #667eea;
}
</style>