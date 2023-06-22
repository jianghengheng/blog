import axios from '../../axios/index'
const baseUrl = '/message'

//获取留言板
export function getMessage(params: {
    pageSize: number
    pageNumber: number
}) {
    return axios.get(`${baseUrl}`, {
        params: {
            ...params
        }
    });
}

//添加留言板
export function addMessage(data: {
    content: string,
    releaseTime: string,
    userId: number | string
}) {
    return axios.post(`${baseUrl}/addMessage`, { ...data }
    );
}
