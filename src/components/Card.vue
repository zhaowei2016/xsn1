<!--  -->
<template>
  <div class="list">
    <div v-for="item in cardList" :key="item.goodsId">
      <van-swipe-cell>
        <van-card :num="item.countNum"  :price="Number(item.realAmount).toFixed(2)"  :title="item.prodName"
          class="goods-card" :thumb="item.logoImage">
          <template v-if="isCart"  #num>
            <van-stepper integer @change="change" min="0" v-model="item.countNum" />
          </template>
          <template  #desc>
            <div class="desc">
              {{item.summary}}
            </div>
          </template>
        </van-card>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: '',
  props: ['cardList','isCart'],
  setup(props: any,ctx:any) {
    console.log('props', props)
    console.log('1-开始创建组件-setup')
    const { cardList } = toRefs(props)
    // const data = reactive({
    //   cartList: [{
    //     goodsId: 1,
    //     price: 12.88,
    //     desc: '好喝',
    //     title: '牛奶',
    //     num: 5
    //   }, {
    //     goodsId: 2,
    //     price: 12.88,
    //     desc: '好喝',
    //     title: '牛奶',
    //     num: 5
    //   }, {
    //     goodsId: 3,
    //     price: 12.88,
    //     desc: '好喝',
    //     title: '牛奶',
    //     num: 5
    //   }]
    // })
    const change = (item: unknown) => {
      console.log(item)
      ctx.emit('updateCardList',cardList)
    }
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    return {
      cardList,
      change
    }

  }
};
</script>
<style lang='scss' scoped>
.goods-card{
   text-align: left;
   margin-top: 10px;
   background-color: rgb(255, 255, 255);
}
.desc{
  color:#646566;
}
</style>