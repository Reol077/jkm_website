<template>
  <el-scrollbar class="base">
    <el-card class="showCard">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入学号" v-model="tableData.number" clearable
            @clear="getDataByNumber(this.tableData.defaultCurrent, this.tableData.defaultPageSize)"
            @keyup.enter="getDataByNumber(this.tableData.defaultCurrent, this.tableData.defaultPageSize)">
            <template v-slot:append>
              <el-button @click="getDataByNumber(this.tableData.defaultCurrent, this.tableData.defaultPageSize)">
                <el-icon class="iconfont icon-sousuo"></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="strTimeStart"
            @clear="getDataByNumber(this.tableData.defaultCurrent, this.tableData.defaultPageSize)"
            @keyup.enter="getDataByNumber(this.tableData.defaultCurrent, this.tableData.defaultPageSize)">
            <template v-slot:append>
              <el-button @click="changeCalShowStart">
                <el-icon class="iconfont icon-riqi"></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="0.5">___</el-col>
        <el-col :span="4">
          <el-input v-model="strTimeEnd"
            @clear="getDataByNumber(this.tableData.defaultCurrent, this.tableData.defaultPageSize)"
            @keyup.enter="getDataByNumber(this.tableData.defaultCurrent, this.tableData.defaultPageSize)">
            <template v-slot:append>
              <el-button @click="changeCalShowEnd">
                <el-icon class="iconfont icon-riqi"></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="getDataByTime(this.tableData.defaultCurrent, this.tableData.defaultPageSize)"><el-icon
              class="iconfont icon-sousuo"></el-icon></el-button>
        </el-col>
        <el-col :push="5" :span="2">
          <el-button @click="getData(this.tableData.defaultCurrent, this.tableData.defaultPageSize)">显示全部</el-button>
        </el-col>
      </el-row>
      <a-table :dataSource="historyData" :columns="columns" :pagination="tableData" style="margin-top: 10px;" />
    </el-card>
    <el-dialog v-model="isCalShowStart" title="请选择日期">
      <a-calendar :fullscreen="false" :value="tableData.dateStart" @select="onSelectStart"></a-calendar>
    </el-dialog>
    <el-dialog v-model="isCalShowEnd" title="请选择日期">
      <a-calendar :fullscreen="false" :value="tableData.dateEnd" @select="onSelectEnd"></a-calendar>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import { Table, Calendar } from 'ant-design-vue';
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export default {
  components: {
    'a-table': Table,
    'a-calendar': Calendar
  },
  data() {
    return {
      historyData: [
      ],
      isNumber: false,
      isTime: false,
      isCalShowStart: false,
      isCalShowEnd: false,
      tableData: {
        number: "",
        dateNow: dayjs(),
        dateStart: dayjs(),
        dateEnd: dayjs(),
        defaultCurrent: 1,
        defaultPageSize: 5,
        current: 1,
        total: 0,
        start: -1000,
        end: 1000,
        pageSizeOptions: ['5', '10', '15', '20'],
        onChange: (current, size) => {
          this.tableData.current = current;
          this.tableData.pageSize = size;
          if (!this.isNumber && !this.isTime) this.getData(current, size, true)
          else if (this.isNumber && !this.isTime) this.getDataByNumber(current, size, true)
          else if (!this.isNumber && this.isTime) this.getDataByTime(current, size, true)
          else this.getDataByTime(current, size)
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
            return dayjs(text.text).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '是否绿码',
          dataIndex: 'isGreen',
          customRender: (isGreen) => (isGreen.value ? '是' : '否'),
        },
      ],
    }
  },
  computed: {
    strTimeStart() {
      return this.tableData.dateStart.format('YYYY-MM-DD')
    },
    strTimeEnd() {
      return this.tableData.dateEnd.format('YYYY-MM-DD')
    },
  },
  methods: {
    getData(current, pageSize, change = false) {
      if (!change) this.tableData.current = 1
      this.$http.get(`/user/all/${current}/${pageSize}/${this.tableData.start}/${this.tableData.end}/${1}`).then(res => {
        this.historyData = res.data.data.records
        this.tableData.total = pageSize * res.data.data.total
        const newData = this.historyData.map((item, index) => ({ ...item, index: index + 1 }));
        this.historyData = newData
        this.$queuePostFlushCb
        this.isNumber = false
        this.isTime = false
      })
    },
    getDataByNumber(current, pageSize, change = false) {
      if (!change) this.tableData.current = 1
      this.$http.get(`/user/all/${current}/${pageSize}/${this.tableData.start}/${this.tableData.end}/${this.tableData.number}/${1}`).then(res => {
        this.historyData = res.data.data.records
        this.tableData.total = pageSize * res.data.data.total
        const newData = this.historyData.map((item, index) => ({ ...item, index: index + 1 }));
        this.historyData = newData
        this.$queuePostFlushCb
        this.isNumber = true
      })
    },
    getDataByTime(current, pageSize, change = false) {
      if (!change) this.tableData.current = 1
      if (this.tableData.dateStart.diff(this.tableData.dateEnd, 'day') >= 0) {
        this.$message.error("起始日期需要小于结束日期")
        return false
      } else {
        const start = this.tableData.dateStart.diff(this.tableData.dateNow, 'day')
        const end = this.tableData.dateEnd.diff(this.tableData.dateNow, 'day')
        this.$http.get(`/user/all/${current}/${pageSize}/${start}/${end}/${this.tableData.number}/${1}`).then(res => {
          this.historyData = res.data.data.records
          this.tableData.total = pageSize * res.data.data.total
          const newData = this.historyData.map((item, index) => ({ ...item, index: index + 1 }));
          this.historyData = newData
          this.$queuePostFlushCb
          this.isTime = true
        })
      }
    },
    onSelectStart(value) {
      console.log('###')
      this.tableData.dateStart = value
    },
    onSelectEnd(value) {
      console.log('###')
      this.tableData.dateEnd = value
    },
    changeCalShowStart() {
      this.isCalShowStart = !this.isCalShowStart
    },
    changeCalShowEnd() {
      this.isCalShowEnd = !this.isCalShowEnd
    }
  },
  mounted() {
    this.getData(this.tableData.defaultCurrent, this.tableData.defaultPageSize)
  }
}
</script>

<style lang="less" scoped></style>