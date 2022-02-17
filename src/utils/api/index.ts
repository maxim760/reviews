
import { ReviewData } from '../'
import axios from "axios"
const $host = axios.create({
  baseURL: 'https://sycret.ru/service/api/api',
})

$host.interceptors.request.use((config) => {
  const apikey = ReviewData.getApiKey()
  if (config.method === 'post') {
    config.data = JSON.stringify({ ...JSON.parse(config.data), ApiKey: apikey })
  } else {
    config.params = { ...config.params, ApiKey: apikey }
  }
  return config
})

export { $host }