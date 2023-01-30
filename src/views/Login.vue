<!--  -->
<template>
  <div class="login">
    <div class="header">登录</div>
    <div class="container">
      <input v-model="username" type="text" placeholder="请输入用户名">
      <span class="left"></span>
      <span class="right"></span>
      <span class="top"></span>
      <span class="bottom"></span>
    </div>
    <div class="container1">
      <input v-model="password" type="password" placeholder="请输入密码">
      <span class="left"></span>
      <span class="right"></span>
      <span class="top"></span>
      <span class="bottom"></span>
    </div>
    <div @click="Sub" class="btn">登录</div>
  </div>

</template>

<script lang='ts'>
import { reactive, toRefs,  onMounted } from 'vue'
import { login } from '@/api/api'
import { useRouter } from 'vue-router';

export default {
  name: '',
  setup() {
    const router = useRouter()
    console.log('1-开始创建组件-setup')
    const state = reactive({
      username: '',
      password: '',
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    const Sub = async (value: any) => {
      const res1: any = await login({ loginName: state.username, password: state.password }).catch(err => console.error(err))
      console.log('res1',res1);
      if(res1.code === 0){
      router.push({ name: 'areahome',params: {...res1.data,address:(res1.data.province + '/' + res1.data.schoolName)}})
      }

    }
    return {
      Sub,
      ...toRefs(state),
    }

  }
};
</script>
<style lang='scss' scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  height: 100%;
}

.login {
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
}

.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
  color: #61dafb;
}

.container {
  height: 30px;
  width: 250px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

input {
  width: 100%;
  height: 100%;
  position: relative;
  outline: none;
  border: none;
  box-sizing: border-box;
  padding-left: 5px;
  background-color: #282c34;
  color: #61dafb;
  caret-color: #61dafb;
}

input::placeholder {
  color: #61dafb;
}

// span {
//   position: absolute;
//   content: "";
//   display: block;
//   background-color: #61dafb;
//   transition: transform .1s ease-in-out;
// }

.top,
.bottom {
  left: 0px;
  right: 0px;
  height: 2px;
}

.left,
.right {
  top: 0px;
  bottom: 0px;
  width: 2px;
  transform: scaleY(0);
}

.top {
  top: 0px;
  transform: scaleX(0);
  transform-origin: left center;
  transition-delay: .2s;
}

.left {
  left: 0px;
  transform-origin: bottom center;
  transition-delay: .3s;
}

.bottom {
  bottom: 0px;
}

.right {
  right: 0px;
  transform-origin: top center;
  transition-delay: .1s;
}

input:focus~.right {
  transform: scaleY(1);
  transform-origin: bottom center;
}

input:focus~.left {
  transform: scaleY(1);
  transform-origin: top center;
}

input:focus~.top {
  transform: scaleY(1);
  transform-origin: right center;
}

.container1 {
  height: 30px;
  width: 250px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.btn {
  position: absolute;
  width: 240px;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 10px 5px;
  margin-top: 40px;
  background-color: #61dafb;
  color: #fff;
}
</style>