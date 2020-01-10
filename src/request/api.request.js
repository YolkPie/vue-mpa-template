import HttpRequest from './axios'
const baseUrl = process.env.REQUEST_URL

const axios = new HttpRequest(baseUrl)
export default axios
