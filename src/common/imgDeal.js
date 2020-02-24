import img from '@/models/img'
class Img {
    createId() {
        return Math.random()
            .toString(36)
            .substring(2)
    }
    async imgFuc(file) {
        // 调用自定义图片上传的接口
        const res = await img.imageUpload(file)
        for (let i = 0; i < res.length; i++) {
            // 固定用法，返回一个promise
            return Promise.resolve({
                id: res[i].id,
                url: res[i].url,
            })
        }
    }
}
export default new Img();