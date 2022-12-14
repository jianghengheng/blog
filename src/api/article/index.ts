import axios from '../../axios/index'
enum URL {

    AddArticle = '/addArticle',
    GetArticle='/getArticle',
    GetArticleById='/getArticleById',
    GetArticleByCategoryId='/getArticleByCategoryId'
}

//添加文章
export function AddArticle(data: any) {
    return axios.post(URL.AddArticle, { ...data });
}
//获取文章
export function GetArticle() {
    return axios.get(URL.GetArticle, );
}
//通过id 获取文章
export function GetArticleById(id:number) {
    return axios.get(URL.GetArticleById+'/'+id, );
}
//通过分类id 获取文章
export function GetArticleByCategoryId(id:number) {
    return axios.get(URL.GetArticleByCategoryId+'/'+id, );
}