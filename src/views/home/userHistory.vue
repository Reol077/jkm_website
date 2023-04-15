<template>
  <div class="base">
    <el-card class="showCard">
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
      historyData: [
      ],
      tableData: {
        defaultCurrent: 1,
        defaultPageSize: 10,
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
          title: "#",
          dataIndex: "index",
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
          title: '核酸检测时期',
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
        this.historyData=newData
      })
    },
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped></style>