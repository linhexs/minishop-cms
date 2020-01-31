import { get, _delete, post, patch, put } from '@/lin/plugins/axios'
class Product {
    async getCategory() {
      const res = await get('v1/category')
      return res
    }
  
    async delCategoryByIds(ids) {
      // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
      const res = await _delete('v1/category', { ids }, { handleError: this.handleError })
      return res
    }
  }
  
export default new Product()