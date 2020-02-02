import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class Theme {
  /**
   * 获取主题信息
   */
  async getThemes() {
    const res = await get('v1/theme')
    return res
  }
  /**
   * 删除主题
   * @param {*} ids 
   */
  async delThemeByIds(ids) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await _delete('v1/theme', { ids }, { handleError: this.handleError })
    return res
  }
  /**
   * 获取可用商品信息
   */
  async getProducts(){
    const res = await get('v1/product')
    return res
  }
}

export default new Theme()
