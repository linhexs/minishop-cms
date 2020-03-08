import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class Theme {
  /**
   * 获取主题信息
   */
  async getThemes() {
    const res = await get('v1/theme',{handleError: true})
    return res
  }
  /**
   * 删除主题
   * @param {*} ids 
   */
  async delThemeByIds(ids) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await _delete('v1/theme', { ids,handleError: true} )
    return res
  }
  /**
   * 获取可用商品信息
   */
  async getProducts(){
    const res = await get('v1/product',{handleError: true})
    return res
  }
  /**
   * 添加主题
   * @param {*} obj 
   */
  async addTheme(obj){
    const res = await post('v1/theme',obj,{handleError: true})
    return res
  }
  /**
   * 添加关联商品
   * @param {*} obj 
   */
  async addRelProduct(id,ids){
    const res = await post(`v1/theme/product/${id}`,ids,{handleError: true})
    return res
  }
  /**
   * 更新主题主体信息
   */
  async editTheme(id,ids){
    const res = await patch(`v1/theme/${id}`,ids,{handleError: true})
    return res
  }
  /**
   * 获取主体信息
   * @param {]} id 
   * @param {*} ids 
   */
  async getThemeById(id){
    const res = await get(`v1/theme/${id}`,{handleError: true})
    return res
  }
  async addRelProduct(id,obj){
    const res = await post(`v1/theme/product/${id}`,obj,{handleError: true})
    return res
  }
  async delRelProduct(id,obj){
    const res = await _delete(`v1/theme/product/${id}`,obj,{handleError: true})
    return res
  }
}

export default new Theme()
