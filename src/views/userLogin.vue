<template>
  <div class="base">
    <!--  注册登录界面 -->
    <div class="loginAndRegist">
      <!-- 登录界面 -->
      <div class="loginArea">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 标语 -->
          <div class="title" v-show="isShow">
            LOGIN
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 密码和用户名框 -->
          <el-form :model="loginUser" class="pwdArea" v-show="isShow" :rules="loginRules">
            <el-form-item style="flex: 1;justify-content: center;display: flex;align-items: center" prop="number">
              <el-input v-model="loginUser.number" style="width: 170px;" placeholder="学号/工号"></el-input>
            </el-form-item>
            <el-form-item style="flex: 1;justify-content: center;display: flex;align-items: center" prop="password">
              <el-input v-model="loginUser.password" style="width: 170px;" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="flex: 1;justify-content: center;display: flex;align-items: center" prop="code">
              <el-input v-model="loginUser.code" style="width: 85px;" placeholder="验证码"></el-input>
              <img :src="imgUrl" style="height: 30px; width: 80px;cursor:pointer;margin-left: 5px;"
                @click="getCodeImage()" />
            </el-form-item>
          </el-form>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 登录注册按钮 -->
          <div v-show="isShow" class="btnArea">
            <el-button type="primary" round style="background-color: #409eff;letter-spacing: 5px;"
              @click="UserLogin">登录</el-button>
          </div>
        </transition>
      </div>
      <div class="registArea">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!--  注册表头-->
          <div v-show="!isShow" class="rigistTitle">
            用户注册
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!--注册表单-->
          <el-form :model="regUser" v-show="!isShow" class="registForm" :rules="regRules" ref="form">
            <div v-if="active == 1">
              <el-form-item style="flex: 1;display: flex;justify-content: center;align-items: center" prop="number">
                学&nbsp;号/工&nbsp;号:
                <el-input placeholder="请输入用户名" v-model="regUser.number" style="width: 165px;margin-left: 10px" clearable>
                </el-input>
              </el-form-item>
              <el-form-item style="flex: 1;display: flex;justify-content: center;align-items: center" prop="name">
                姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:
                <el-input placeholder="请输入姓名" style="width: 165px;margin-left: 10px" v-model="regUser.name"></el-input>
              </el-form-item>
              <el-form-item style="flex: 1;display: flex;justify-content: center;align-items: center" prop="email">
                邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:
                <el-input placeholder="请输入邮箱" style="width: 165px;margin-left: 10px" v-model="regUser.email"></el-input>
              </el-form-item>
              <!-- 下一步 -->
              <el-form-item v-show="!isShow" class="nextBtn">
                <el-button type="primary" round style="background-color: #409eff;letter-spacing: 5px"
                  @click="nextItem('form')">下一步</el-button>
              </el-form-item>
            </div>
            <div v-if="active == 2">
              <el-form-item style="flex: 1;display: flex;justify-content: center;align-items: center;" prop="password">
                密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:
                <el-input placeholder="请输入密码" style="width: 165px;margin-left: 10px" v-model="regUser.password"
                  show-password></el-input>
              </el-form-item>
              <el-form-item style="flex: 1;display: flex;justify-content: center;align-items: center;" prop="type">
                类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:
                <el-radio-group v-model="regUser.type" style="padding-left: 10px;">
                  <el-radio label="学生" />
                  <el-radio label="老师" />
                </el-radio-group>
              </el-form-item>
              <el-form-item style="flex: 1;justify-content: center;display: flex;align-items: center" prop="code">
                验&nbsp;&nbsp;&nbsp;&nbsp;证&nbsp;&nbsp;&nbsp;码:
                <el-input v-model="regUser.code" style="width: 85px;margin-left: 10px" placeholder="验证码"></el-input>
                <img :src="imgUrl" style="height: 30px; width: 80px;cursor:pointer;margin-left: 5px;"
                  @click="getCodeImage()" />
              </el-form-item>
              <!-- 上一步 -->
              <el-form-item v-show="!isShow" class="backBtn">
                <el-button type="primary" round style="background-color: #409eff;letter-spacing: 5px"
                  @click="backItem">上一步</el-button>
              </el-form-item>
              <!-- 下一步 -->
              <el-form-item v-show="!isShow" class="nextBtn">
                <el-button type="primary" round style="background-color: #409eff;letter-spacing: 5px"
                  @click="nextItem2('form')">下一步</el-button>
              </el-form-item>
            </div>
            <div v-if="active == 3">
              <el-form-item style="flex: 1;justify-content: center;display: flex;align-items: center" prop="emailCode">
                邮箱验证码:
                <el-input v-model="regUser.emailCode" style="width: 170px; margin-left: 10px;"
                  placeholder="邮箱验证码"></el-input>
              </el-form-item>
              <el-form-item v-show="!isShow" class="backBtn">
                <el-button type="primary" round style="background-color: #409eff;letter-spacing: 5px"
                  @click="backItem">上一步</el-button>
              </el-form-item>
              <!-- 注册按钮 -->
              <el-form-item v-show="!isShow" style="float: right;">
                <el-button type="primary" round style="background-color: #409eff;letter-spacing: 5px"
                  @click="userRegister">注册</el-button>
              </el-form-item>
            </div>
          </el-form>
        </transition>
      </div>
      <!-- 信息展示界面 -->
      <div id="aaa" class="showInfo" :style="{
        borderTopRightRadius: styleObj.bordertoprightradius,
        borderBottomRightRadius: styleObj.borderbottomrightradius,
        borderTopLeftRadius: styleObj.bordertopleftradius,
        borderBottomLeftRadius: styleObj.borderbottomleftradius,
        right: styleObj.rightDis
      }" ref="showInfoView">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 没有用户输入用户名或者找不到用户名的时候 -->
          <div v-show="isShow"
            style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
            <!-- 欢迎语 -->
            <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #002FA7;font-weight: bold">
              欢迎登入健康码管理系统
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="primary" style="background-color:#409eff;border: 1px solid #409eff;" round
                @click="changeToRegiest">还没有账户？点击注册</el-button>
            </div>
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 用户注册的时候展示信息 -->
          <div v-show="!isShow"
            style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
            <!-- 欢迎语 -->
            <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #002FA7;font-weight: bold">
              欢迎注册
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="primary" style="background-color:#409eff;border: 1px solid #409eff;" round
                @click="changeToLogin">已有账户？点击登录</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginRegister',
  data() {
    return {
      isShow: true,
      isItem: false,
      imgUrl: "",
      active: 3,
      loginUser: {
        number: "",
        password: "",
        code: ""
      },
      loginRules: {
        number: [{ required: true, message: "请输入工号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      regUser: {
        number: "022020208",
        name: "吴双",
        email: "2571219329@qq.com",
        password: "123456",
        type: "老师",
        code: "cccc",
        emailCode: ""
      },
      regRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        number: [{ required: true, message: "请输入工号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [{ required: true, message: "请选择身份", trigger: "change" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        emailCode: [{ required: true, message: "请输入邮箱验证码", trigger: "blur" }]
      },
      styleObj: {
        bordertoprightradius: '15px',
        borderbottomrightradius: '15px',
        bordertopleftradius: '0px',
        borderbottomleftradius: '0px',
        rightDis: '0px'
      },
    }
  },
  computed: {
    userType() {
      return this.regUser.type === "老师" ? 1 : 0;
    }
  },
  created() {
    this.getCodeImage()
  },

  methods: {
    getCodeImage() {
      this.$http.get('/codeImage', {
        responseType: "blob",
      }).then(res => {
        console.log(res.data)
        this.imgUrl = window.URL.createObjectURL(res.data);
      })
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
    nextItem2(data) {
      this.$refs[data].validate(valid => {
        if (valid) {
          this.$http.get('/imageCode', {
            params: { imageCode: this.regUser.code }
          })
            .then(res => {
              console.log(res.data)
              if (res.data.code == 60000) {
                this.active++;
                let submitParams = {}
                submitParams.email = this.regUser.email
                submitParams.name = this.regUser.name
                submitParams.number = this.regUser.number
                submitParams.password = this.regUser.password
                submitParams.type = this.userType
                this.$http.post('emailVerity', { params: submitParams }).then(res => {
                  console.log(submitParams)
                  console.log(res)
                  if (!res.data.success) this.$message({
                    message: "验证码发送失败，请刷新重试",
                    type: 'error'
                  })
                })
              } else if (res.data.code == 60002) {
                this.$message({
                  message: "验证码错误",
                  type: "error"
                })
              }
            }
            ).catch(error => {
              console.log(error)
              this.$message({
                message: "请求超时，请检查网络",
                type: "error"
              });
            });
          if (this.active >= 3) {
            this.active = 3;
          }
        }
      })
    },
    backItem() {
      this.getCodeImage()
      this.active--;
      if (this.active <= 1) {
        this.active = 1;
      }
    },
    userRegister() {
      let submitParams = {}
      submitParams.code = this.regUser.emailCode
      submitParams.email = this.regUser.email
      submitParams.name = this.regUser.name
      submitParams.number = this.regUser.number
      submitParams.password = this.regUser.password
      submitParams.type = this.userType

      this.$http.post('register', { params: submitParams }).then(res => {
        console.log(res)
      })

    },
    changeToRegiest() {
      this.styleObj.bordertoprightradius = '0px'
      this.styleObj.borderbottomrightradius = '0px'
      this.styleObj.bordertopleftradius = '15px'
      this.styleObj.borderbottomleftradius = '15px'
      this.styleObj.rightDis = '50%'
      this.isShow = !this.isShow
      this.getCodeImage()
    },
    changeToLogin() {
      this.styleObj.bordertoprightradius = '15px'
      this.styleObj.borderbottomrightradius = '15px'
      this.styleObj.bordertopleftradius = '0px'
      this.styleObj.borderbottomleftradius = '0px'
      this.styleObj.rightDis = '0px'
      this.isShow = !this.isShow
      this.getCodeImage()
    },
  }
}
</script>

<style lang="less" scoped>
.base {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/background.jpg");
  background-size: 100%;
}

.loginAndRegist {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.loginArea {
  background-color: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 400px;
  width: 350px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.registArea {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 400px;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.showInfo {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  position: absolute;
  height: 400px;
  width: 350px;
  z-index: 2;
  top: 0;
  right: 0;
  background-image: url("../assets/images/welcome.jpg");
  background-size: 90%;
}

.showInfo:hover {
  background-size: 100%;
  background-position: -50px -50px;
}

.title {
  width: 70%;
  flex: 1;
  border-bottom: 1px solid #409eff;
  display: flex;
  align-items: center;
  color: #409eff;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
}

#aaa {
  transition: 0.3s linear;
}

.pwdArea {
  padding-top: 18px;
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pwdArea input {
  outline: none;
  height: 30%;
  border-radius: 13px;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}

.pwdArea input:focus {
  border: 2px solid #409eff;
}

.btnArea {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.rigistTitle {
  width: 70%;
  flex: 1;
  color: #409eff;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #409eff;
}

.registForm {
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #409eff;
  font-size: 16px;
  padding-top: 18px;
}

.registForm input {
  outline: none;
  height: 30%;
  border-radius: 13px;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}

.registForm input:focus {
  border: 2px solid #409eff;
}

.nextBtn {
  float: right;
  justify-content: center;
  align-items: center;
}

.backBtn {
  float: left;
  justify-content: center;
  align-items: center;
}
</style>