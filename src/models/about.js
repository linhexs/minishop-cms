import { get } from '@/lin/plugins/axios'

class Analysis {
  /**
   * 获取banner列表
   */
  async getData(obj) {
    const res = await get('v1/analysis/order/base',obj)
    return res
  }
  /**
   * 获取会员统计
   * @param {*} obj 
   */
  async getMemberData(obj) {
    const res = await get('v1/analysis/user/base',obj)
    return res
  }
}

export default new Analysis()
