<template>
  <div class="base">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>上传</el-breadcrumb-item>
      <el-breadcrumb-item>核酸检测</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="uploadCard">
      <el-upload ref="uploadRef" class="upload-demo box" drag accept=".jpg,.png,jpeg" action="/api/ocr/hsjcUpload"
        with-credentials name="image" :on-success="handleSuccess" :on-error="handleError">
        <i class="iconfont icon-shangchuan1 icon"></i>
        <span>点击或拖拽上传</span>
        <span>只能上传jpg/png文件</span>
      </el-upload>
    </el-card>
    <el-card class="tableBox">
      <el-table :data="historyData" border tripe v-show="Object.keys(historyData).length !== 0">
        <el-table-column prop="number" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="isGreen" label="是否绿码">
          <template v-slot="scope">
            <el-tag v-if="scope.row.isGreen" type="success">绿码</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-show="Object.keys(historyData).length === 0"></el-empty>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyData: [
        { number: "022020205", name: "sadff", isGreen: 1 }
      ]
    }
  },
  methods: {
    handleSuccess(res) {
      if (res.success) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    handleError() {
      this.$message.error("上传失败")
    },
  },
}
</script>

<style lang="less" scoped>
.base {
  display: flex;
  flex-direction: column;

  .uploadCard {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;

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

  .tableBox {
    margin: 0 20px;
  }
}
</style>