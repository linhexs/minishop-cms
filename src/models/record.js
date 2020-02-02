import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class record {
  /**
   * 获取发货记录
   */
  async getRecord(page,count,select='',input='') {
    if(select!=='' && input !== ''){
      const res = await get(`v1/order/shipment/record?count=${count}&page=${page}&${select}=${input}`,{handleError:true})
      return res
    }else{
      const res = await get('v1/order/shipment/record',{page:page,count:count},{handleError:true})
      return res
    }
  }
}

export default new record()
