import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class Banner {
  /**
   * 获取banner列表
   */
  async getBanners() {
    const res = await get('v1/banner')
    return res
  }
/**
 * 删除banner
 * @param {*} ids 
 */
  async delBannerByIds(ids) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await _delete('v1/banner', { ids }, { handleError: this.handleError })
    return res
  }
  /**
   * 添加banner
   * @param {*} obj 
   */
  async addBanner(obj) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await post('v1/banner', obj, { handleError: true })
    return res
  }
  /**
   * 修改banner主体信息
   */
  async editBannerInfo(id,obj) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await patch(`v1/banner/${id}`, obj, { handleError: true })
    return res
  }

  /**
   * 图片上传
   * @param {*} obj 
   */
  // async addImage(obj) {
  //   // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
  //   const res = await post('img', { url: obj })
  //   return res
  // }
}

export default new Banner()
