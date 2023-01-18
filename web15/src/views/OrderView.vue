<!--  -->
<template>
  <div>
    <van-tabs sticky v-model:active="active">
      <van-tab v-for="item in tabs" :title="item.tabName" :key="item.id">
        <van-pull-refresh v-model="lists[active].refreshing" @refresh="onRefresh">
          <van-list v-model:error="lists[active].error" error-text="请求失败，点击重新加载" v-model:loading="lists[active].loading"
            :finished="lists[active].finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="(item, index) in lists[active].list" :key="item" class="z-cell">
              <div class="z_t tl ">{{ item.goodName }} <span class="status">{{ delStatus(item.status) }}</span></div>
              <div class="z_cell_c tl fz14">创建时间: {{ item.createDate }}</div>
              <div class="z_cell_c tl fz14">订单编号: {{ item.orderNo }}</div>
              <div class="z_b tl fz14">
                <div class="left">实付金额: {{ item.amount.toFixed(2) }}</div>
                <div v-if="item.status === 0" class="right">
                  <van-button @click="cancel(item.orderNo, index)" class="b_left" type="default" size="mini">取消
                  </van-button>
                  <van-button @click='pay(item.orderNo)' type="danger" size="mini">继续支付</van-button>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { getOrderList, orderCancel, toPay } from '@/api/api'
import { Toast, Dialog } from 'vant'
export default {
  name: '',
  setup() {
    console.log('1-开始创建组件-setup')
    const data = reactive({
      active: 0,
      pageSize: 20,
      lists: [{
        list: [],
        loading: false,
        finished: false,
        pageNo: 0,
        error: false,
        refreshing: false,

      }, {
        list: [],
        loading: false,
        finished: false,
        pageNo: 0,
        error: false,
        refreshing: false,
      }, {
        list: [],
        loading: false,
        finished: false,
        pageNo: 0,
        refreshing: false,
        error: false
      },],
      tabs: [{ tabName: '待支付', id: 0 }, { tabName: '已支付', id: 4 }, { tabName: '全部', id: null },]
    })
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    const delStatus = (status: any) => {
      switch (status) {
        case 0:
          return '待支付'
          break;
        case 4:
          return '已支付'
          break;
        case 10:
          return '已取消'
          break;
        default:
          return ''
          break;
      }

    }
    const pay = async (orderNo: any) => {
      const res: any = await toPay({ orderNo }).catch(err => console.error(err))
      location.href = res.data
    }
    const onRefresh = (data: any) => {
      let initData = {
        list: [],
        loading: false,
        finished: false,
        pageNo: 0,
        refreshing: false,
        error: false
      }
      onLoad(true)

    }
    const cancel = (orderNo: any, index: number) => {
      console.log(orderNo)
      Dialog.confirm({
        message:
          '确认取消该订单?',
      })
        .then(async () => {
          const res: any = await orderCancel({ orderNo }).catch(err => console.error(err))
          if (res.code == 0) {
            Toast('取消成功')
            data.lists[data.active].list.splice(index, 1)
          }
        })
        .catch(() => {
          // on cancel
        });
    }
    const onLoad = async (init:any) => {
      if(init){
        data.lists[data.active].pageNo = 0
        data.lists[data.active].finished =false
      }
      data.lists[data.active].error = false
      let arrObj: any = data.lists[data.active]
      let { pageNo } = arrObj
      let params = {
        pageNo,
        pageSize: data.pageSize,
        status: data.tabs[data.active].id
      }
      data.lists[data.active].loading = true
      const res: any = await getOrderList(params).catch(err => {
        console.error(err, data.lists[data.active])
        data.lists[data.active].error = true
        data.lists[data.active].loading = false
        data.lists[data.active].refreshing = false
        return;
      })
      console.log('res', res)
      data.lists[data.active].refreshing = false
      data.lists[data.active].loading = false
      data.lists[data.active].pageNo += 1
      data.lists[data.active].list = data.lists[data.active].list.concat(res.data)
      if (res && res.data.length < data.pageSize) {
        data.lists[data.active].finished = true
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    };
    const refData = toRefs(data);
    return {
      ...refData,
      pay,
      cancel,
      onLoad,
      delStatus,
      onRefresh
    }

  }
};
</script>
<style lang='scss' scoped>
.z-cell {
  border-bottom: 1px solid#e4ebf6;
  margin: 10px 0;
  padding: 10px 16px;
  background-color: #fff;
  line-height: 24px;

  .status {
    font-size: 12px;
    color: #8E989E;
  }

  .z_t {
    font-family: DIN-Medium;
    // height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // line-height: 30px;
    color: #000;
    font-size: 16px;
  }

  .z_cell_c {
    line-height: 24px;
  }

  .z_b {
    // height: 46px;
    //  line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right {
      .b_left {
        margin-right: 5px;
      }
    }
  }
}
</style>