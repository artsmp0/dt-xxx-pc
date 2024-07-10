<script setup lang="ts">
const router = useRouter()

// 跳转路由
router.replace('/')
</script>

<template>
  <div class="auth">
    <img alt="" src="@/assets/imgs/authLoading.gif">
    <p>正在努力加载中...</p>
  </div>
</template>

<style lang="scss" scoped>
.auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    img {
        width: 400px;
    }

    p {
        font-size: 16px;
        color: #ccc;
    }
}
</style>
