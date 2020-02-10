import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class order {
  /**
   * 获取订单列表
   */
  async getOrder(page,count,input) {
    if(input !== ''){
      const res = await get('v1/order',{input},{handleError:true})
      return res
    }else{
      const res = await get('v1/order',{page,count})
      return res
    }
  }
}

export default new order()
