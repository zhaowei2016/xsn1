<!--  -->
<template>
  <div class="content">
    <div class="des">
      <van-cell class="tl" title="客户姓名" :value="clientName" />
      <van-cell class="tl" title="客户电话" :value="serviceMobile" />
      <van-cell class="tl" title="学校地址" :value="address" />
      <van-cell class="tl" title="学校班级" :value="schoolCName" />
    </div>
    <Card :cardList="productList"></Card>
    <van-submit-bar :price="price" button-text="立即支付" @submit="onSubmit" />
  </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import Card from "@/components/Card.vue";
import { createOrder } from '@/api/api'
export default {
  components: {
    Card,
  },
  name: '',
  setup() {
    console.log('1-开始创建组件-setup')
    let submitData = JSON.parse(localStorage.getItem('submitObj') || '{}')
    console.log('sssss', submitData)
    const state = reactive({
      productList: submitData.productList || [],
      price: submitData.price,
      clientName: submitData.clientName,
      serviceMobile: submitData.serviceMobile,
      address: submitData.address,
      schoolCName: submitData.schoolCName,
      success:false,
    })

    console.log('productList', state.productList)
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    const onSubmit = async () => {
      if(state.success){
        return;
      }
      const res: any = await createOrder(submitData).catch(err => console.error(err))
      if (res.code == 0) {
        state.success = true
        location.href = res.data
        console.log('res', res)
      }

    }
    const refData = toRefs(state);
    return {
      onSubmit,
      ...refData,
    }

  }
};
</script>
<style lang='scss' scoped>
.content {
  margin-bottom: 88px;
}
</style>