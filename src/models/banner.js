import { get, _delete, post } from '@/lin/plugins/axios'

class Banner {
  async getBanners() {
    const res = await get('v1/banner')
    return res
  }

  async delBannerByIds(ids) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await _delete('v1/banner', { ids }, { handleError: this.handleError })
    return res
  }

  async addBanner(obj) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await post('v1/banner', obj, { handleError: true })
    return res
  }

  async addImage(obj) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await post('img', { url: obj })
    return res
  }
}

export default new Banner()
