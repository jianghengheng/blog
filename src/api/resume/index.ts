import axios from '../../axios/index'
const baseUrl = '/resume'

//获取简历
export function getResume(id=1) {
    return axios.get(`${baseUrl}/${id}`);
}
