<template>
  <router-view />
</template>
<script >
import { getOpenId } from '@/api/api'
import { useRouter } from 'vue-router';
export default {
  name: 'Web5App',


  mounted () {
    this.getCode()
     let router = useRouter()
      router.beforeEach(function (to, from, next) {
        if (to.meta.title) {
          document.title = to.meta.title;
        }
        next();
      });
  },
  methods: {
    async getCode () {
     
      let code = this.getUrlCode().code;
      console.log('code', code, location.href)
      let url = encodeURIComponent(location.href)
      if (code == null || code === '') {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx531ce135b82fb269&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
      } else {
        const res = await getOpenId({ code }).catch(err => console.error(err))
        console.log('res', res)
        localStorage.setItem('openId', res.openid)
      }
    },
    getUrlCode () {
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        var strs = str.split("&")
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
        }
      }
      return theRequest
    },
  },
};
</script>
<style lang="scss">
body {
  background-color: #f5f5f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
