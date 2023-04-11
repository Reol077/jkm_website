<template>
  <el-container class="base">
    <el-aside :width="isCollapse ? '64px' : '150px'">
      <div class="logo">
        <img src="../../assets/logo.png" alt="">
        <div class="logo-text" v-show="isShow">
          <span>Health</span>
          <span>Code</span>
        </div>
      </div>
      <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true"
        default-active="/home/history">
        <el-sub-menu index="1">
          <template #title>
            <i class="iconfont icon-shangchuan"></i>
            <span style="margin-left: 10px;">上传</span>
          </template>
          <el-menu-item index="/home/jkm">
            <template #title>
              <i class="iconfont icon-jiankangma"></i>
              <span style="margin-left: 10px;">健康码</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/home/xcm">
            <template #title>
              <i class="iconfont icon-hangcheng"></i>
              <span style="margin-left: 10px;">行程码</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/home/history">
          <i class="iconfont icon-shouye"></i>
          <span style="margin-left: 10px;">历史上传</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <button @click="shouhui">
          <i class="iconfont icon-shouhui-left" v-show="direction"></i>
          <i class="iconfont icon-shouhui-right" v-show="!direction"></i>
        </button>
        <button @click="tuichu">
          <i class="iconfont icon-tuichu" style="font-weight: normal;"></i>
        </button>
      </el-header>
      <el-main class="main_box"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      isShow: true,
      direction: true
    }
  },
  methods: {
    shouhui() {
      this.isCollapse = !this.isCollapse
      this.isShow = !this.isShow
      this.direction = !this.direction
    },
    tuichu() {
      this.$http.get('/verity/logout').then(res => {
        console.log(res)
      })
      window.sessionStorage.clear()
      this.$router.push('/')
    }
  }

}
</script>

<style lang="less" scoped>
.base {
  height: 100%;

  .main_box {
    width: 100%;
    padding: 20px;
  }
}

.el-aside {
  background-color: #EBF1F6;
  transition: 0.5s;

  .logo {
    margin-top: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8dbb9d;

    .logo-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      transition: 0.5s;
    }
  }

  .el-menu {
    border: none;
    --el-menu-bg-color: #EBF1F6;
    --el-menu-text-color: #8dbb9d;
    --el-menu-active-color: #959b9f;
  }
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EBF1F6;
  padding: 10px;

  button {
    cursor: pointer;
    border: none;

    i {
      color: #606266;
      font-size: 20px;
      font-weight: bold;

      &:hover {
        color: #8dbb9d
      }
    }
  }
}
</style>