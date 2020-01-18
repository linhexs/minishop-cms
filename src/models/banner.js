import { get, _delete } from '@/lin/plugins/axios'

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
}

export default new Banner()
