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
      <a-table :dataSource="historyData" :columns="columns" :pagination="tableData" />
    </el-card>
  </div>
</template>

<script>
import { Table } from 'ant-design-vue';
import moment from 'moment'


export default {
  components: {
    'a-table': Table,
  },
  data() {
    return {
      historyData: [],
      tableData: {
        defaultCurrent: 1,
        defaultPageSize: 3,
        total: 0,
        onChange: (current, size) => {
          this.tableData.defaultCurrent = current;
          this.tableData.defaultPageSize = size;
          this.getData(),
          this.$queuePostFlushCb
        },

      },
      columns: [
        {
          title: '上传日期',
          dataIndex: 'jkmTime',
          customRender: (text) => {
            return moment(text).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '是否绿码',
          dataIndex: 'isGreen',
          customRender: (isGreen) => (isGreen ? '是' : '否'),
        },
      ],
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
    handlePaginationChange(newPage) {
      this.tableData.current = newPage
    },
    getData() {
      this.$http.get(`/user/all/${this.tableData.defaultCurrent}/${this.tableData.defaultPageSize}/${-1000}/${1000}/${1}`).then(res => {
        this.historyData = res.data.data.records
        this.tableData.total = this.tableData.defaultPageSize * res.data.data.total
      })
    },
  },
  created() {
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