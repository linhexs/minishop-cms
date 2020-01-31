import { get, _delete, post, patch, put } from '@/lin/plugins/axios'

class Theme {
  async getThemes() {
    const res = await get('v1/theme')
    return res
  }

  async delThemeByIds(ids) {
    // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
    const res = await _delete('v1/theme', { ids }, { handleError: this.handleError })
    return res
  }
}

export default new Theme()
