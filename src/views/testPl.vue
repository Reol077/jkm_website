<template>
    <div>
        <el-input v-model="code"></el-input>
        <img :src="this.imgUrl" style="height: 30px; width: 80px;cursor:pointer;margin-left: 5px;" @click="getCodeImage" />
        <el-button @click="yanzhen">验证</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: "",
            code: ""
        }
    },
    created() { this.getCodeImage() },
    methods: {
        getCodeImage() {
            this.$http.get('/codeImage', {
                responseType: "blob",
            }).then(res => {
                console.log(res.data)
                this.imgUrl = window.URL.createObjectURL(res.data);
            })
        },
        yanzhen() {
            this.$http.get('/imageCode', { params: { imageCode: this.code } }).then(res => { console.log(res.data) })
        }
    }
}
</script>

<style></style>