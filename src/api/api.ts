import { api } from './axios'
export const getSchoolList = (params: unknown) => api.post('wx/school/list', params)
export const getSchoolCList = (params: unknown) => api.post('wx/school/listAndChilds', params)
export const getArea = (params: unknown) => api.post('app/product/areaList', params)
export const getAdver = (params: unknown) => api.post('/app/adver/getAdver', params)


export const getProductList = (params: unknown) => api.post('app/product/list', params)
// 产品类型接口，参数dictType 传"product_type"
export const getProdType = (params: unknown) => api.post('/app/product/getProdType', params)
// 根据类型获取产品，参数typeId  产品类型id

export const getProd = (params: unknown) => api.post('/app/product/getProd', params)
export const getOrderList= (params: unknown) => api.get('app/order/orders', params)
export const orderCancel= (params: unknown) => api.get('app/order/orders/cancel', params)
//  create order
export const createOrder= (params: unknown) => api.post('app/order/orders', params)
//  pay
export const toPay= (params: unknown) => api.get('app/order/orders/pay', params)
export const campusAdd= (params: unknown) => api.post('wx/campusCooperation/add', params)
export const getOpenId= (params: unknown) => api.get('wx/accessToken', params)
export const login= (params: unknown) => api.post('/app/adver/login ', params)
export const createOrder1= (params: unknown) => api.post('/app/order/schoolOrders ', params)
