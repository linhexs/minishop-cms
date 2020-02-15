/**
 * 处理catch返回值
 * Object.values(e.data.msg).join(';'),
 */
export default function(obj){
    if(typeof obj === 'string'){
        return obj
    }
    if(Object.values(obj).length>1){
        return Object.values(obj)[0]
    }else{
        return Object.values(obj)
    }
}