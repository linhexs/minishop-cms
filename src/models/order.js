import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class order {
  /**
   * 获取订单列表
   */
  async getOrder(page, count, input, searchDate) {
    if (searchDate.length > 1) {
      const res = await get('v1/order', { page, count, start: searchDate[0], end: searchDate[1] })
      return res
    }
    if (input !== '') {
      let order = input.split('')
      if (((order[0] >= 'A' && order[0] <= 'Z') || (order[0] >= 'a' && order[0] <= 'z'))) {
        const res = await get('v1/order', { page, count, order_no: input, handleError: true })
        return res
      } else {
        const res = await get('v1/order', { page, count, name: input, handleError: true })
        return res
      }
    } else {
      const res = await get('v1/order', { page, count,handleError: true })
      return res
    }
  }
  /**
   * 发货
   */
  async shipment(id,obj) {
    const res = await post(`v1/order/shipment/${id}`,obj,{handleError:true})
    return res
  }
  /**
   * 获取物流
   */
  async Logistics(order_no){
    const res = await get(`v1/logistics/${order_no}`,{handleError:true})
    return res
  }
}

export default new order()
