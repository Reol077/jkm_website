<template>
  <div class="base">
    <el-card class="showCard">
      <el-table :data="historyData" border tripe v-show="Object.keys(historyData).length !== 0">
        <el-table-column type="index" />
        <el-table-column prop="number" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="isGreen" label="是否绿码">
          <template v-slot="scope">
            <el-tag v-if="scope.row.isGreen" type="success">绿码</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="核酸检测" />
      </el-table>
      <el-pagination layout="prev, pager, next" :page-size=tableData.size :total=tableData.total :prev-click="handlePrev"
        :next-click="handleNext" v-show="Object.keys(historyData).length !== 0" />
      <el-empty v-show="Object.keys(historyData).length === 0"></el-empty></el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyData: [
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
        { number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" },
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
  }
}
</script>

<style lang="less" scoped></style>