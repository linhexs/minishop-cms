import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class order {
  /**
   * 获取订单列表
   */
  async getOrder(page,count,input,searchDate) {
    if(searchDate.length > 1){
      const res = await get('v1/order',{page,count,start:searchDate[0],end:searchDate[1]})
      return res
    }
    if(input !== ''){
      const res = await get('v1/order',{page,count,input},{handleError:true})
      return res
    }else{
      const res = await get('v1/order',{page,count})
      return res
    }
  }
}

export default new order()
