import axios from '../../axios/index'
enum URL {

    AddArticle = '/addArticle',
    GetArticle='/getArticle'
}

//添加文章
export function AddArticle(data: any) {
    return axios.post(URL.AddArticle, { ...data });
}
//获取文章
export function GetArticle() {
    return axios.get(URL.GetArticle, );
}