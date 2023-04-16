<template>
  <el-scrollbar class="base">
    <el-card class="showCard">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入学号" v-model="tableData.number" clearable @clear="getDataByNumber" @keyup.enter="getDataByNumber">
            <template v-slot:append>
              <el-button @click="getDataByNumber">
                <el-icon class="iconfont icon-sousuo"></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <a-table :dataSource="historyData" :columns="columns" :pagination="tableData" style="margin-top: 10px;" />
    </el-card>
  </el-scrollbar>
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
      historyData: [
      ],
      tableData: {
        number: "",
        defaultCurrent: 1,
        defaultPageSize: 5,
        total: 0,
        pageSizeOptions: ['5', '10', '15', '20'],
        onChange: (current, size) => {
          this.tableData.defaultCurrent = current;
          this.tableData.defaultPageSize = size;
          this.getData()

        },
      },
      columns: [
        {
          title: "#",
          dataIndex: "index",
        },
        {
          title: "学号",
          dataIndex: "number"
        },
        {
          title: "姓名",
          dataIndex: "name",
        },
        {
          title: '健康码上传日期',
          dataIndex: 'jkmTime',
          customRender: (text) => {
            return moment(text.text).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '是否绿码',
          dataIndex: 'isGreen',
          customRender: (isGreen) => (isGreen ? '是' : '否'),
        },
        {
          title: '核酸检测上传日期',
          dataIndex: 'hsjcTime',
          customRender: (text) => {
            return moment(text.text).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '核酸检测日期',
          dataIndex: 'testTime',
          customRender: (text) => {
            return moment(text.text).format('YYYY-MM-DD HH:mm:ss')
          }
        },
      ],
    }
  },
  methods: {
    getData() {
      this.$http.get(`/user/all/${this.tableData.defaultCurrent}/${this.tableData.defaultPageSize}/${-1000}/${1000}/${1}`).then(res => {
        this.historyData = res.data.data.records
        this.tableData.total = this.tableData.defaultPageSize * res.data.data.total
        const newData = this.historyData.map((item, index) => ({ ...item, index: index + 1 }));
        this.historyData = newData
        this.$queuePostFlushCb
      })
    },
    getDataByNumber() {
      this.$http.get(`/user/all/${this.tableData.defaultCurrent}/${this.tableData.defaultPageSize}/${-1000}/${1000}/${this.tableData.number}/${1}`).then(res => {
        this.historyData = res.data.data.records
        this.tableData.total = this.tableData.defaultPageSize * res.data.data.total
        const newData = this.historyData.map((item, index) => ({ ...item, index: index + 1 }));
        this.historyData = newData
        this.$queuePostFlushCb
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped></style>