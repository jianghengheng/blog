import axios from '../../axios/index'
enum URL {

    AddArticle = '/addArticle'
}

// 获取公告列表
export function AddArticle(data: any) {
    return axios.post(URL.AddArticle, { ...data });
}