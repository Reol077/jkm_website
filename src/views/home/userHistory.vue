<template>
  <div class="base">
    <el-card class="showCard">
      <el-table :data="historyData" :fit="false" border tripe v-show="Object.keys(historyData).length !== 0">
        <el-table-column prop="number" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="isGreen" label="是否绿码">
          <template v-slot="scope">
            <el-tag v-if="scope.row.isGreen" type="success">绿码</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-show="Object.keys(historyData).length === 0"></el-empty></el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyData: [
      ],
      tableData: {
        size: 5,
        total: 50,
        current: 1
      }
    }
  },
  methods: {
    handlePrev() {

    },
    handleNext() {

    },
    getData() {
      this.$http.get(`/user/all/${this.tableData.current}/${this.tableData.size}/${-1000}/${1000}/${1}`).then(
        res => {
          this.historyData = res.data.data.records
        }
      )
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped></style>