import axios from '../../axios/index'
const baseUrl = '/comment'
enum URL {

    addComment = '/addComment',
    GetCommonByArticeleId = '/findByArticleId',

}

//添加评论
export function addComment(data: any) {
    return axios.post(baseUrl + URL.addComment, { ...data });
}
export function GetCommonByArticeleId(id:number|string|undefined) {
    console.log(id);
    
    return axios.get(baseUrl + URL.GetCommonByArticeleId, {params:{
        id
    } });
}
