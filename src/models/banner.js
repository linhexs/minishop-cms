import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class Banner {
  handleError = true
  /**
   * 获取banner列表
   */
  async getBanners() {
    const res = await get('v1/banner',{handleError: true})
    return res
  }
/**
 * 删除banner
 * @param {*} ids 
 */
  async delBannerByIds(ids) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await _delete('v1/banner', { ids }, {  handleError: true })
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
  async editBanner(id, name, description) {
    const res = await patch(`v1/banner/${id}`, {
      name,
      description,
    }, { handleError: true })
    return res
  }

  /**
   * 新增轮播图元素
   */
  async addBannerItems(items) {
    const res = await post('v1/banner/item', { items }, { handleError: true })
    return res
  }

  /**
   * 删除轮播图元素
   */
  async delBannerItems(ids) {
    const res = await _delete('v1/banner/item', { ids }, { handleError: true })
    return res
  }

  /**
   * 编辑轮播图元素
   */
  async editBannerItems(items) {
    const res = await put('v1/banner/item', { items }, { handleError:true })
    return res
  }
}

export default new Banner()
