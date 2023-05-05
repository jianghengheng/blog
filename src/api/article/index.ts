import axios from '../../axios/index'
const baseUrl = '/article'
enum URL {

    AddArticle = '/addArticle',
    GetArticle = '/getArticle',
    GetArticleById = '/getArticleById',
    GetArticleByCategoryId = '/getArticleByCategoryId'
}

//添加文章
export function AddArticle(data: any) {
    return axios.post(baseUrl + URL.AddArticle, { ...data });
}
//获取文章
export function GetArticle() {
    return axios.get(baseUrl + URL.GetArticle,);
}
//通过id 获取文章
export function GetArticleById(id: number) {
    return axios.get(baseUrl + URL.GetArticleById + '/' + id,);
}
//通过分类id 获取文章
export function GetArticleByCategoryId(id: number) {
    return axios.get(baseUrl + URL.GetArticleByCategoryId + '/' + id,);
}