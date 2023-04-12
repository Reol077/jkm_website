<template>
  <div class="base">
    <el-card class="uploadCard">
      <el-upload class="upload-demo box" drag accept=".jpg,.png" :limit="1" action="/api/test/test">
        <i class="iconfont icon-shangchuan1 icon"></i>
        <span>点击或拖拽上传</span>
        <span>只能上传jpg/png文件</span>
      </el-upload>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.uploadCard {
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    width: 500px;

    .icon {
      font-size: 56px;
      color: #939d99;
    }

    span {
      display: block;
      color: #939d99;
      margin: 10px;
    }
  }
}
</style>