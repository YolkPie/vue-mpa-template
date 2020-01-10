import { jsonpAdapter } from '@yolkpie/utils'
import HttpRequest from './axios'
const baseUrl = ''

const axios = new HttpRequest(baseUrl)

export const login = ({ userName, password }) => {
  const params = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    params,
    adapter: jsonpAdapter
  })
}
