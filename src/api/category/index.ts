import axios from '../../axios/index'
const baseUrl='/category'
enum URL {
    GetCategroyList = '/getCategoryList'
}

// 获取公告列表
export function GetCategroyList() {
    return axios.get(baseUrl+URL.GetCategroyList);
}