import WebClient from 'web-client-starter'
import { apiConfig } from '../config/apiConfig'

WebClient.interceptor.request(config => {
  config.baseURL = apiConfig.baseUrl
  return config
})

export default WebClient
