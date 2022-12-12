import axios from '../../axios/index'

enum URL {
    GetCategroyList = '/getCategoryList'
}

// 获取公告列表
export function GetCategroyList() {
    return axios.get(URL.GetCategroyList);
}