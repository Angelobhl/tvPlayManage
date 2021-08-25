import Taro, { Chain } from '@tarojs/taro'
import {getStorageStr} from '../util/common'

class Http {
  baseUrl: string = 'http://localhost:8080'

  async get (opts: Taro.RequestParams | string) {
    if (typeof opts === 'string') {
      opts = {
        url: opts,
      }
    }

    return await this.request(Object.assign({method: 'GET'}, opts))
  }

  async post (opts: Taro.RequestParams) {
    return await this.request(Object.assign({method: 'POST'}, opts))
  }

  beforeRequest (chain: Chain) {
    const requestParams = chain.requestParams
    const openId: string = getStorageStr('openId')
    if (!requestParams.url.includes('http://')) {
      requestParams.url = this.baseUrl + requestParams.url
    }
    requestParams.dataType = 'json'
    requestParams.header = {
      open_id: openId
    }

    return chain.proceed(requestParams)
  }

  async request (opts: Taro.RequestParams) {
    const res = await Taro.request(opts)
    return res.data
  }
}


const HttpObj = new Http()
Taro.addInterceptor(HttpObj.beforeRequest.bind(HttpObj))

export default HttpObj
