<template>
  <div class="home">
    <div class="topt bg" :style="{backgroundImage:`url(${imgUrl})`}">
      <img src="@/assets/head.png" alt="">
      <div class="right">
        <!-- <p class="txt_t">游开心</p> -->
        <p class="txt_b">校园学生奶营养服务中心欢迎您！</p>
      </div>
    </div>
    <div class="content">
      <div class="bgw content_t">
        <img src="@/assets/horn.png" alt="">
        <span>{{ title }}</span>
      </div>
      <div class="bgw content_m">
        <div class="txt">
          <div>
            <p class="txt_t">学生信息</p>
            <p class="txt_b">请依次填写下方内容，确保信息无误</p>
          </div>
        </div>
      </div>
      <van-field v-model="schoolName" is-link readonly name="picker1" placeholder="请选择区域/学校" @click="pick1 = true" />
      <van-field v-model="className" is-link readonly name="picker2" placeholder="请选择年级/班级" @click="pick2 = true" />

      <van-field v-model="sName" placeholder="请输入姓名" />
      <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
      <div class="bgw content_m content_b">
        <div class="txt txt1">
          <div>
            <p class="txt_t">奶品信息</p>
            <p class="txt_b">请点击选择想要为孩子订购的奶产品套餐</p>
          </div>
        </div>
      </div>
      <div class="googs_list">
        <Card isCart="true" @updateCardList="updateCardList" :cardList="productList"></Card>
      </div>
      <div class="content_ag fz14">
        <van-checkbox v-model="checked">已经阅读 <span @click="showDialog">《自愿订购协议》</span>，同意征订。</van-checkbox>
      <img class="imgurl1" :src="imgUrl1" alt="">

      </div>
    </div>

    <van-popup v-model:show="pick1" position="bottom">
      <van-picker :columns-field-names="customFieldName" :columns="columns1" @confirm="onConfirm1"
        @cancel="pick1 = false" />
    </van-popup>
    <van-popup v-model:show="pick2" position="bottom">
      <van-picker ref="picker" :columns-field-names="customFieldName1" :columns="columns2" @confirm="onConfirm2"
        @cancel="pick2 = false" />
    </van-popup>
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { Field, Picker, Popup, Checkbox, SubmitBar, Dialog } from 'vant'
import { reactive, toRefs, onBeforeMount, watch } from 'vue'
import Card from "@/components/Card.vue";
import { getAdver, getSchoolCList, getProductList,getArea } from '@/api/api'
import { useRouter } from 'vue-router';

export default {
  components: {
    vanField: Field,
    vanPicker: Picker,
    vanPopup: Popup,
    vanSubmitBar: SubmitBar,
    vanCheckbox: Checkbox,
    Card,

  },
  setup() {
    const state = reactive({
      columns1: [],
      columns2: [],
      productList: [],
      pick1: false,
      pick2: false,
      schoolName: '',
      address: '',
      schoolId: '',
      classId: '',
      className: '',
      sName: '',
      tel: '',
      checked: true,
      price: 0,
      year:new Date().getFullYear(),
      bg: '',
      imgUrl:'',
      imgUrl1:'',
      title:'',

    })
    const router = useRouter()
    const customFieldName = {
      text: 'schoolName',
      children:'getSchoolList'
    };
    const customFieldName1 = {
      text: 'className',
      children: 'classList',
    };
    onBeforeMount(async () => {
   
      const res0: any = await getAdver({}).catch(err => console.error(err))
      const res: any = await getArea({}).catch(err => console.error(err))
      console.log('resgetAdver',res)
        state.imgUrl = 'http://www.czxlkj.cn/'+res0.data.logoImage1
        state.imgUrl1 = 'http://www.czxlkj.cn/'+res0.data.logoImage2
        state.title = res0.data.title
        console.log(state.imgUrl);
        
        // require("../assets/bg.png")
        console.log('ddd',state.bg);
      res.data.forEach((v: any) => {
        v.schoolName = v.dictLabel
      })
      console.log('res',res)
      state.columns1 = state.columns1.concat(res.data)
      localStorage.removeItem('submitObj')
    })
    const onConfirm1 = async (value: any) => {
      console.log('value.schoolName',value[1].schoolName)
      state.schoolName = value[1].schoolName
      state.schoolId = value[1].schoolId
      state.pick1 = false
      //年级班级
      state.address = value[0].schoolName  + '/' + value[1].schoolName 
      const res1: any = await getSchoolCList({ schoolId: state.schoolId }).catch(err => console.error(err))
      const res2: any = await getProductList({ schoolId: state.schoolId }).catch(err => console.error(err))
      state.productList = res2.data
      res1.forEach((v: any) => {
        v.className = v.gradeName
      })
      state.columns2 = res1

    }
    const updateCardList = (cardList: any) => {
      state.productList = cardList
      state.price = state.productList.reduce((sum: any, e: any) => {
        return sum + (e.countNum) * (e.realAmount) * 100
      }, 0)
    }
    const onConfirm2 = (value: any) => {
      console.log('---',value[0],value[1])
      state.className = value[0].className + '/' + value[1].className
      state.classId = value[1].classId
      state.pick2 = false
    }

    const onSubmit = () => {
      const newArr = state.productList.map((item: any) => { return { amount: item.realAmount, goodId: item.id, countNum: item.countNum } })
      let submitObj: any = {
        address: state.address,
        schoolId: state.schoolId,
        classId: state.classId,
        orderProductList: newArr.filter(v => v.countNum > 0),
        productList: state.productList.filter((v: any) => v.countNum > 0),
        clientName: state.sName,
        serviceMobile: state.tel,
        price: state.price,
        schoolCName: state.schoolName + state.className
      }
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      console.log('submitObj', submitObj, reg.test(submitObj.serviceMobile))
      if (reg.test(submitObj.serviceMobile)) {
        if (state.checked) {
          if (submitObj.classId && submitObj.clientName) {
            if (submitObj.productList.length > 0) {
              localStorage.setItem('submitObj', JSON.stringify(submitObj))
              router.push({ name: 'checkorder' })
            } else {
              Dialog.alert({
                message: '请添加所需产品'
              })
            }
          } else {

            Dialog.alert({
              message: '请选择学校班级和姓名'
            })
          }

        } else {
          Dialog.alert({
            message: '请勾选协议'
          })
        }
      } else {
        Dialog.alert({
          message: '请正确填写手机号'
        })
      }

    }

    const showDialog = () => {
      Dialog.alert({
        title: '自愿订购协议',
        messageAlign: 'left',
        message: `尊敬的家长：
        为了孩子更健康，从小养成喝牛奶的好习惯，我园引入了 “学生饮用奶计划”, 选择了蒙牛集团的学生奶。
        幼儿园、中小学阶段是孩子生长发育的黄金期，普遍存在营养不均衡，因缺钙导致生长缓慢、免疫力低下、近视、贫血等现象。
        实施学生奶计划是许多国家为改善学生营养健康状况而采取的一项通用且有效的措施。日本政府曾在全国强力推行“学生饮用奶计划” ，结果，现在日本人平均身高比二战时期提高了11厘米，成为国际公认增强人类体质的奇迹。
        经国务院批准，在全国分步实施 “学生饮用奶计划” ，这是一项国家级“营养干预计划”，通过此项计划向在校幼儿园孩子、小学生提供由定点企业严格按照国家标准生产的 “学生专用奶”。此计划已被列入《中国儿童发展纲要》和《国务院关于基础教育改革与发展的决定》，尤其处于疫情期间，根据《新冠肺炎防治营养膳食指导》(2020.2.8)建议一般人群每天食用奶及奶制品300ml，能有效增强抵抗力，有助于新冠肺炎的防控和救治。
        中国学生饮用奶带“学”字标识，校园专供，校内饮用，市场无销售，其价格低于市场同品质牛奶。
        从本学期开始，我园实施学生奶计划，引入为蒙牛“学生奶”，以家长自愿为原则。
        每天给孩子加一餐牛奶，让老师和小朋友帮助平时喝奶少的小伙伴养成喝奶的好习惯，受益一生。`
      })
    }
    return {
      onConfirm1,
      onConfirm2,
      onSubmit,
      showDialog,
      customFieldName,
      customFieldName1,
      updateCardList,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  height: 140px;
  background-size: 100% 100%;
  // background-image: url('@/assets/bg.png');
}
.imgurl1{
  width:100%;
  margin-top: 30px;
}
.topt {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 48px;
    height: 48px;
  }

  .right {
    color: #fff;
    height: 60px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    line-height: 24px;

    .txt_t {
      font-size: 22px;
      font-weight: 400;
    }

    .txt_b {
      font-size: 16px;
    }
  }
}

.content {
  margin: 0 10px;

  .content_t {
    height: 50px;
    position: relative;
    top: -15px;
    display: flex;
    align-items: center;
    border-radius: 5px;

    img {
      height: 28px;
      width: 28px;
      margin: 0 10px;
    }
  }

  .content_m {
    height: 60px;
    background-image: url('@/assets/bg1.png');
    background-size: 100% 100%;
    line-height: 24px;

    .txt {
      color: #fff;
      text-align: left;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      padding-left: 10px;

      &.txt1 {
        padding-left: 30px;
      }

      .txt_t {
        font-weight: 400;
      }

      .txt_b {
        font-size: 14px;
      }
    }
  }

  .content_b {
    background-image: url('@/assets/bg2.png');
    margin-top: 15px;
  }

  .content_ag {
    padding: 18px 0 99px;
    line-height: 24px;

    span {
      color: #2f79fd;
    }
  }

  .bgw {
    background-color: #fff;
  }
}
</style>
