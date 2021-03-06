import { get, _delete, post, patch, put } from '@/lin/plugins/axios'
class Product {
  /**
   * 获取分类信息
   */
    async getCategory() {
      const res = await get('v1/category',{handleError: true})
      return res
    }
    /**
     * 添加分类
     */
    async addCategory(obj) {
      const res = await post('v1/category',obj,{handleError:true})
      return res
    }
  /**
   * 删除分类
   * @param {*} ids 
   */ 
    async delCategoryByIds(ids) {
      // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
      const res = await _delete('v1/category', { ids }, { handleError: true })
      return res
    }
    /**
     * 修改分类
     * @param {*} page 
     * @param {*} count 
     * @param {*} product_name 
     */
    async editCategory(id,obj){
      const res = await put(`v1/category/${id}`,obj,{handleError:true})
      return res
    }
    /**
     * 获取商品列表
     */
    async getProducts(page,count,product_name='') {
      const res = await get('v1/product/paginate',{page,count,product_name,handleError:true})
      return res
    }
    /**
     * 删除商品
     * @param {*} ids 
     */
    async delProductById(ids){
      const res = await _delete('v1/product', { ids }, { handleError: true })
      return res
    }
    /**
     * 修改商品状态
     */
    async modifyStatus(ids){
      const res = await patch(`v1/product/${ids}`,{handleError: true})
      return res
    }
    /**
     * 添加商品
     * @param {*} obj 
     */
    async addProduct(obj){
      const res = await post('v1/product',obj,{handleError:true})
      return res
    }
    /**
     * 修改商品主题数据
     * @param {*} obj 
     */
    async editProduct(obj){
      const res = await put('v1/product',obj,{handleError:true})
      return res
    }
    /**
     * 新增商品介绍图片
     * @param {*} obj 
     */
    async addProductImg(obj){
      console.log(obj)
      const res = await post('v1/product/image',{image:obj},{handleError:true})
      return res
    }
    /**
     * 修改商品介绍图片
     * @param {*} obj 
     */
    async editProductImg(obj){
      console.log({image:obj})
      const res = await put('v1/product/image',{image:obj},{handleError:true})
      return res
    }
    /**
     * 删除商品介绍图片
     * @param {*} obj 
     */
    async delProductImg(obj){
      console.log(obj)
      const res = await _delete('v1/product/image',{ids:obj},{handleError:true})
      console.log(res)
      return res
    }
  }
  
export default new Product()