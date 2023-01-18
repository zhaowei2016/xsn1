<!--  -->
<template>
  <div>
    <div class="bg"></div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 客户类别 -->
        <van-field v-model="subData.customerType" is-link readonly name="customerType" label="客户类别"
          placeholder="点击选择客户类型" @click="showPicker1 = true" :rules="[{ required: true, message: '请输入客户类别' }]" />
        <van-popup v-model:show="showPicker1" position="bottom">
          <van-picker :columns-field-names="customFieldName" :columns="columns1" @confirm="onConfirm1"
            @cancel="showPicker1 = false" />
        </van-popup>

        <!-- 客户代码 -->
        <van-field v-model="subData.customerCode" type="number" maxlength="4" name="customerCode" label="客户代码"
          placeholder="请输入4位客户代码" :rules="[{ required: true, message: '请输入4位客户代码' }]" />
        <!-- 客户名称 -->
        <van-field v-model="subData.customerName" name="customerName" label="客户名称" placeholder="请输入客户名称"
          :rules="[{ required: true, message: '请输入客户名称' }]" />
        <!-- 产品类型 -->
        <van-field v-model="subData.productType" is-link readonly name="productType" label="产品类型" placeholder="点击选择产品类型"
          @click="showProType = true" :rules="[{ required: true, message: '请输入产品类别' }]" />
        <van-popup v-model:show="showProType" position="bottom">
          <van-picker :columns-field-names="customFieldName" :columns="proTypeList" @confirm="onConfirmProType"
            @cancel="showProType = false" />
        </van-popup>
        <!-- 产品名称 -->
        <van-field v-model="subData.productSpecifications" is-link readonly name="productSpecifications" label="产品名称"
          placeholder="点击选择产品名称" @click="showProName = true" :rules="[{ required: true, message: '请输入产品名称' }]" />
        <van-popup v-model:show="showProName" position="bottom">
          <van-picker :columns-field-names="customFieldName1" :columns="proList" @confirm="onConfirmProName"
            @cancel="showProName = false" />
        </van-popup>


        <!-- 订购数量 -->
        <van-field v-model="subData.orderNumber" name="orderNumber" label="订购数量" type="digit" placeholder="请输入订购数量"
          :rules="[{ required: true, message: '请输入订购数量' }]" />
        <!-- 手机号 -->
        <van-field v-model="subData.phone" type="tel" maxlength="11" name="phone" label="手机号" placeholder="请输入手机号"
          :rules="[{ validator, message: '请正确输入手机号' }]" />
        <!-- 送货日期 -->
        <van-field v-model="subData.deliveryTime" is-link readonly name="deliveryTime" label="送货日期" placeholder="点击选择日期"
          @click="showCalendar2 = true" :rules="[{ required: true, message: '请输入送货日期' }]" />
        <van-calendar v-model:show="showCalendar2" @confirm="onConfirm2" />
        <!-- 起始日 -->
        <van-field v-model="subData.startTime" is-link readonly name="startTime" label="本单奶饮用起始日" placeholder="点击选择日期"
          @click="showCalendar3 = true" :rules="[{ required: true, message: '请输入饮用起始日' }]" />
        <van-calendar v-model:show="showCalendar3" @confirm="onConfirm3" />
        <!-- 截止日 -->
        <van-field v-model="subData.endTime" is-link readonly name="endTime" label="本单奶饮用截止日" placeholder="点击选择日期"
          @click="showCalendar4 = true" :rules="[{ required: true, message: '请输入饮用截止日' }]" />
        <van-calendar v-model:show="showCalendar4" @confirm="onConfirm4" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { getProdType, getProd, campusAdd } from '@/api/api'
import { Toast } from 'vant'
export default {
  name: '',
  setup() {
    const validator = (val: any) => /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val);

    const state = reactive({
      subData: {
        customerType: '',
        customerCode: '',
        customerName: '',
        orderNumber: '',
        phone: '',
        deliveryTime: '',
        startTime: '',
        endTime: '',
        productType: '',
        productSpecifications: '',
      },
      columns1: [],
      showPicker1: false,
      showCalendar2: false,
      showCalendar3: false,
      showCalendar4: false,
      showProType: false,
      showProName: false,
      proTypeList: [],
      proList: [],
    })
    const customFieldName = {
      text: 'dictLabel',
      value: 'dictValue'
    };
    const customFieldName1 = {
      text: 'prodName',
      value: 'id'
    };
    const onConfirm1 = (data: any) => {
      state.subData.customerType = data.dictLabel;
      state.showPicker1 = false;
    };
    const onConfirm2 = (date: Date) => {
      state.subData.deliveryTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      state.showCalendar2 = false;
    };
    const onConfirm3 = (date: Date) => {
      state.subData.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      state.showCalendar3 = false;
    };
    const onConfirm4 = (date: Date) => {
      state.subData.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      state.showCalendar4 = false;

    };
    const onConfirmProType = async (data: any) => {
      console.log('onConfirmProType', data)
      const res: any = await getProd({ typeId: data.dictValue }).catch(err => console.error(err))
      state.showProType = false
      state.proList = res.data
      state.subData.productType = data.dictLabel
      console.log('res', res)
    };
    const onConfirmProName = (data: any) => {
      console.log('data', data)
      state.showProName = false;
      state.subData.productSpecifications = data.prodName
    };
    console.log('dadta===>', state.subData)
    const onSubmit = async (values: any) => {
      console.log('submit', values);
      values.deliveryTime += ' 00:00:00'
      values.startTime += ' 00:00:00'
      values.endTime += ' 00:00:00'
      // let params = {
      //   "customerType": "qqe",
      //   "customerCode": "qweqw",
      //   "customerName": "wqeq",
      //   "productType": "qewe",
      //   "productSpecifications": "qwewq",
      //   "orderNumber": 12,
      //   "phone": "15616224256",
      //   "deliveryTime": "2022-07-31 18:46:09",
      //   "startTime": "2022-07-31 18:46:13",
      //   "endTime": "2022-07-31 18:46:15"
      // }
      const res: any = await campusAdd(values).catch(err => console.error(err))
      if (res.code == 0) {
        Toast('提交成功')
        state.subData = {
          customerType: '',
          customerCode: '',
          customerName: '',
          orderNumber: '',
          phone: '',
          deliveryTime: '',
          startTime: '',
          endTime: '',
          productType: '',
          productSpecifications: '',
        }
      }

    };
    onBeforeMount(async () => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
      const res: any = await getProdType({ dictType: 'product_type' }).catch(err => console.error(err))
      const res1: any = await getProdType({ dictType: 'client_type' }).catch(err => console.error(err))
      state.proTypeList = res.data
      state.columns1 = res1.data
      console.log('res1', res1)

    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    const refData = toRefs(state);
    return {
      onConfirmProType,
      onConfirmProName,
      onSubmit,
      onConfirm1,
      onConfirm2,
      onConfirm3,
      onConfirm4,
      customFieldName,
      customFieldName1,
      validator,
      ...refData,
    }

  }
};
</script>
<style lang='scss' scoped>
.bg {
  height: 140px;
  background-size: 100% 100%;
  background-image: url('@/assets/ss.webp');
  margin: 0 16px 16px;
}
</style>