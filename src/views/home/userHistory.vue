<template>
  <div class="base">
    <el-table :data="historyData" border tripe style="width: 80%;" v-show="Object.keys(historyData).length !== 0">
      <el-table-column prop="number" label="学号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="isGreen" label="健康码" />
      <el-table-column prop="date" label="核酸检测" />
    </el-table>
    <el-empty v-show="Object.keys(historyData).length === 0"></el-empty>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyData: [{ number: "092620209", name: "顾凡", isGreen: true, date: "2022-07-21 7:30:00" }]
    }
  }
}
</script>

<style lang="less" scoped>
.base {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>