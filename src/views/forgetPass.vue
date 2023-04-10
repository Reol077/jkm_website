<template>
    <div class="base">
        <div class="forgetPass">
            <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
                leave-active-class="animate__zoomOut" appear>
                <div class="title">
                    FORGET
                </div>
            </transition>
            <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
                leave-active-class="animate__zoomOut" appear>
            </transition>
            <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
                leave-active-class="animate__zoomOut" appear>
                <el-form class="area" :model="form" :rules="formRules" ref="login">
                    <el-form-item prop="number">
                        <el-input v-model="form.number" style="width: 190px;" placeholder="学号/工号"></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="form.email" style="width: 190px;" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item style="width: 190px;" prop="code">
                        <el-input v-model="form.code" style="width: 50%;" placeholder="邮箱验证码"></el-input>
                        <el-button style="width: 40%;margin-left: 10%;" :disabled="!canClick" @click="getEmailCode">{{
                            getCodeTitle }}</el-button>
                    </el-form-item>
                </el-form>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            canClick: true,
            totalTime: 60,
            getCodeTitle: "获取验证码",
            form: {
                number: "",
                email: "",
                code: ""
            },
            formRules: {
                number: [{ required: true, message: "请输入工号", trigger: "blur" }],
                email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: "blur"
                    }
                ],
            }
        }
    },
    methods: {
        getEmailCode() {
            this.$refs.login.validateField("email", valid => {
                if (valid) {
                    this.verificationCode();
                    this.$http.post('/forget', { params: this.form.email })
                        .then(res => {
                            console.log(res)
                            this.$message({
                                message: "已发送验证码",
                                type: "success"
                            });
                        })
                        .catch(err => {
                            console.log(err)
                            this.$message({
                                message: "请求超时，请检查网络",
                                type: "error"
                            });
                        });
                }
            });
        },
        verificationCode() {
            if (!this.canClick) return;
            this.canClick = !this.canClick;
            this.getCodeTitle = "已发送("+this.totalTime + ")";
            let clock = window.setInterval(() => {
                this.totalTime--;
                this.getCodeTitle = "已发送("+this.totalTime + ")";
                if (this.totalTime < 0) {
                    window.clearInterval(clock);
                    this.getCodeTitle = "已发送("+this.totalTime + ")";
                    this.totalTime = 60;
                    this.canClick = true;
                }
            }, 1000);
        },
    }

}
</script>

<style lang="less">
.base {
    height: 100vh;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/images/background.jpg");
    background-size: 100%;
    overflow: hidden;

    .forgetPass {
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 15px;
        height: 400px;
        width: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        .title {
            width: 70%;
            border-bottom: 1px solid #409eff;
            padding-bottom: 10px;
            text-align: center;
            color: #409eff;
            font-weight: bold;
            font-size: 24px;
        }

        .area {
            padding-top: 18px;
            text-align: center;
        }
    }
}
</style>