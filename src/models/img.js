import { post } from '@/lin/plugins/axios'
class Img{
    async addImage(obj) {
        // { ids } 等价于 { ids : ids }，对象的key和value命名相同时的一种简写
        const res = await post('img', { url: obj })
        return res
      }
}
export default new Img();