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
                <el-form class="area" :model="form" :rules="formRules" ref="form">
                    <div v-if="active == 1">
                        <el-form-item prop="email" style="width: 190px;">
                            <el-input v-model="form.email" placeholder="邮箱"></el-input>
                        </el-form-item>
                        <el-form-item
                            style="flex: 1;justify-content: center;display: flex;align-items: center; width:190px;"
                            prop="code">
                            <el-input v-model="form.code" style="width: 50%;" placeholder="验证码"></el-input>
                            <img :src="imgUrl" style="height: 30px; width: 40%;cursor:pointer;margin-left: 10%;"
                                @click="getCodeImage()" />
                        </el-form-item>
                        <el-form-item style="width: 190px;" prop="emailCode">
                            <el-input v-model="form.emailCode" style="width: 50%;" placeholder="邮箱验证码"></el-input>
                            <el-button style="width: 40%;margin-left: 10%;" :disabled="!canClick" @click="getEmailCode">{{
                                getCodeTitle }}</el-button>
                        </el-form-item>
                        <!-- 下一步 -->
                        <el-form-item class="nextBtn">
                            <el-button type="default" round @click="backLogin()">
                                返回登录</el-button>
                            <div style="width: 20%;"></div>
                            <el-button type="default" round @click="nextItem('form')">
                                下一步</el-button>
                        </el-form-item>
                    </div>
                    <div v-if="active == 2">
                        <el-form-item prop="password" style="width: 190px;">
                            <el-input v-model="form.password" placeholder="密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item prop="repass" style="width: 190px;">
                            <el-input v-model="form.repass" placeholder="再次输入密码" show-password></el-input>
                        </el-form-item>
                        <!-- 下一步 -->
                        <el-form-item class="nextBtn">
                            <el-button type="default" round @click="backItem('form')">
                                上一步</el-button>
                            <div style="width: 20%;"></div>
                            <el-button type="default" round @click="reset('form')">
                                重置</el-button>
                        </el-form-item>
                    </div>
                    <div v-if="active == 3" style="display: flex;flex-direction: column;">
                        <i class="iconfont icon-zhengque myIcon"
                            style="font-size: 48px; color: green;margin-top: 30px;"></i>
                        <span style="color:gray; margin-top: 15px; margin-left: 15px; font-size: 18px;">重置成功！</span>
                        <router-link to="/login" class="routerLink">返回登录</router-link>
                    </div>
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
            active: 1,
            imgUrl: "",
            form: {
                email: "",
                code: "",
                emailCode: "",
                password: "",
                repass: ""
            },
            formRules: {
                email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: "blur"
                    }
                ],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
                emailCode: [{ required: true, message: "请输入邮箱验证码", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                repass: [{
                    required: true,
                    validator: (rule, value, callback) => {
                        if (value === "") {
                            callback(new Error("请再次输入密码"));
                        } else if (value !== this.form.password) {
                            callback(new Error("两次输入密码不一致!"));
                        } else {
                            callback();
                        }
                    },
                    trigger: "blur"
                }],
            }
        }
    },
    created() {
        this.getCodeImage()
    },
    methods: {
        backLogin() {
            this.$router.push('/login')
        },
        nextItem(data) {
            this.$refs[data].validate(valid => {
                if (valid) {
                    this.active++;
                    if (this.active >= 3) {
                        this.active = 3;
                    }
                }
            })
        },
        backItem() {
            this.active--;
            if (this.active <= 1) {
                this.active = 1;
            }
        },
        reset(data) {
            this.$refs[data].validate(valid => {
                if (valid) {
                    const formData = new FormData()
                    formData.append("code", this.form.emailCode)
                    formData.append("email", this.form.email)
                    formData.append("password", this.form.password)
                    this.$http.post('/verity/reset', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        if (res.data.success) {
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            })
                            this.active++
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: "error",
                            })
                        }
                    })
                }
            }).catch(error => {
                console.log(error)
                this.$message.error(error.msg)
            })
        },
        getCodeImage() {
            this.$http.get('/verity/codeImageReset', {
                responseType: "blob",
            }).then(res => {
                console.log(res.data)
                this.imgUrl = window.URL.createObjectURL(res.data);
            })
        },
        getEmailCode() {
            this.$refs.form.validateField(["email", "code"], valid => {
                if (valid) {
                    this.$http.get(`/verity/imageCodeReset/${this.form.code}`).then(res => {
                        if (res.data.success) {
                            this.verificationCode();
                            const formData = new FormData();
                            formData.append('email', this.form.email)
                            this.$http.post('/verity/emailVerityReset', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res => {
                                if (!res.data.success) {
                                    this.$message({
                                        message: res.data.msg,

                                        type: "error"
                                    })
                                } else {
                                    this.$message({

                                        message: res.data.msg,
                                        type: "success"
                                    })
                                }
                            })
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: "error",

                            })
                        }
                    }).catch(error => {
                        this.$message.error(error.msg)
                    })
                }
            });
        },
        verificationCode() {
            if (!this.canClick) return;
            this.canClick = !this.canClick;
            this.getCodeTitle = "已发送(" + this.totalTime + ")";
            let clock = window.setInterval(() => {
                this.totalTime--;
                this.getCodeTitle = "已发送(" + this.totalTime + ")";
                if (this.totalTime < 0) {
                    window.clearInterval(clock);
                    this.getCodeTitle = "获取验证码";
                    this.totalTime = 60;
                    this.canClick = true;
                }
            }, 1000);
        },
    }

}
</script>

<style lang="less" scoped>
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

        .nextBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 190px;

            .el-button {
                letter-spacing: 2px;
                border-radius: 5px;
                width: 40%;
                flex: 2;
            }
        }

        .routerLink {
            text-align: center;
            text-decoration: none;
            margin-top: 15px;
            color: gray;
            font-size: 14px;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>