<script lang="ts" setup>
const router = useRouter()

function backHome() {
  router.replace('/')
}
</script>

<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404 md:flex">
      <div class="pic-404 dark:opacity-70 md:w-137.5!">
        <img alt="404" class="pic-404__parent" src="@/assets/imgs/404.png">
        <img alt="404" class="left pic-404__child" src="@/assets/imgs/404_cloud.png">
        <img alt="404" class="pic-404__child mid" src="@/assets/imgs/404_cloud.png">
        <img alt="404" class="pic-404__child right" src="@/assets/imgs/404_cloud.png">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">
          哎呀!
        </div>
        <div class="bullshit__headline">
          找不到您所要查找的页面...
        </div>
        <div class="bullshit__info">
          请检查您输入的网址是否正确，或点击下面的按钮返回主页。
        </div>
        <NButton type="info" round @click="backHome">
          回到主页
        </NButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wscn-http404-container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.wscn-http404 {
    position: relative;
    padding: 0 50px;
    overflow: hidden;

    .pic-404 {
        width: 450px;
        overflow: hidden;

        &__parent {
            width: 100%;
        }

        &__child {
            @keyframes cloud-left {
                0% {
                    top: 17px;
                    left: 220px;
                    opacity: 0;
                }

                20% {
                    top: 33px;
                    left: 188px;
                    opacity: 1;
                }

                80% {
                    top: 81px;
                    left: 92px;
                    opacity: 1;
                }

                100% {
                    top: 97px;
                    left: 60px;
                    opacity: 0;
                }
            }

            @keyframes cloud-mid {
                0% {
                    top: 10px;
                    left: 420px;
                    opacity: 0;
                }

                20% {
                    top: 40px;
                    left: 360px;
                    opacity: 1;
                }

                70% {
                    top: 130px;
                    left: 180px;
                    opacity: 1;
                }

                100% {
                    top: 160px;
                    left: 120px;
                    opacity: 0;
                }
            }

            @keyframes cloud-right {
                0% {
                    top: 100px;
                    left: 500px;
                    opacity: 0;
                }

                20% {
                    top: 120px;
                    left: 460px;
                    opacity: 1;
                }

                80% {
                    top: 180px;
                    left: 340px;
                    opacity: 1;
                }

                100% {
                    top: 200px;
                    left: 300px;
                    opacity: 0;
                }
            }
            position: absolute;

            &.left {
                top: 17px;
                left: 220px;
                width: 80px;
                opacity: 0;
                animation-name: cloud-left;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1s;
                animation-fill-mode: forwards;
            }

            &.mid {
                top: 10px;
                left: 420px;
                width: 46px;
                opacity: 0;
                animation-name: cloud-mid;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1.2s;
                animation-fill-mode: forwards;
            }

            &.right {
                top: 100px;
                left: 500px;
                width: 62px;
                opacity: 0;
                animation-name: cloud-right;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1s;
                animation-fill-mode: forwards;
            }
        }
    }

    .bullshit {
        @keyframes slide-up {
            0% {
                opacity: 0;
                transform: translateY(60px);
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        float: left;
        width: 300px;
        padding: 30px 0;
        overflow: hidden;

        &__oops {
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
            line-height: 1.25;
            color: var(--info-color);
            opacity: 0;
            animation-name: slide-up;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }

        &__headline {
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: bold;
            line-height: 1.2;
            color: rgba($color: #777, $alpha: 70%);
            opacity: 0;
            animation-name: slide-up;
            animation-duration: 0.5s;
            animation-delay: 0.1s;
            animation-fill-mode: forwards;
        }

        &__info {
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 1.62;
            color: rgba($color: #777, $alpha: 60%);
            opacity: 0;
            animation-name: slide-up;
            animation-duration: 0.5s;
            animation-delay: 0.2s;
            animation-fill-mode: forwards;
        }
    }
}
</style>
