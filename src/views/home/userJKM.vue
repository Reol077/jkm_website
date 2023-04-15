<template>
  <div class="base">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home/student' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>上传</el-breadcrumb-item>
      <el-breadcrumb-item>健康码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="uploadCard">
      <el-upload ref="uploadRef" class="upload-demo box" drag accept=".jpg,.png,jpeg" action="/api/ocr/jkmUpload"
        with-credentials name="image" :on-success="handleSuccess" :on-error="handleError">
        <i class="iconfont icon-shangchuan1 icon"></i>
        <span>点击或拖拽上传</span>
        <span>只能上传jpg/png文件</span>
      </el-upload>
    </el-card>
    <el-card class="tableBox">
      <el-table :data="historyData" border tripe style="width: 100%;" v-show="Object.keys(historyData).length !== 0">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="jkmTime" label="上传时间">
        </el-table-column>
        <el-table-column prop="isGreen" label="是否绿码">
          <template v-slot="scope">
            <el-tag v-if="scope.row.isGreen" type="success">绿码</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :page-size=tableData.size :total=tableData.total :prev-click="handlePrev"
        :next-click="handleNext" v-show="Object.keys(historyData).length !== 0" />
      <el-empty v-show="Object.keys(historyData).length === 0"></el-empty>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyData: [],
      tableData: {
        size: 5,
        total: 1,
        current: 1
      }
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
    handleNext() {

    },
    handlePrev() {

    },
    getData(){
      this.$http.get(`/user/all/${this.tableData.current}/${this.tableData.size}/${-1000}/${1000}/${1}`).then(res=>{
        this.historyData = res.data.data.records
        this.tableData.total=this.tableData.size*res.data.data.total
      })
    }
  },
  mounted(){
    this.getData()
  }
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