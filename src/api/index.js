/**
 * Created by zhangyupeng on 18/12/5.
 **/
import axios from '@/utils/axios'

/**
 * @param {Number} phone // 账号
 * @param {Number||String} password // 密码
 * */
export const login = (params) => {
  return axios.post('/user/login', {...params})
}

/**
 * 学生列表
 * @param {Number} stuid // 学生id
 * */
export const studentList = (stuid) => {
  return axios.get(`/student/list?stuid=${stuid}`)
}

// 所需接口从此文件抛出，接口统一化
