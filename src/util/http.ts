import Taro, { Chain } from '@tarojs/taro'

class Http {
  baseUrl: string = 'http://localhost:8080'

  async get (opts: Taro.RequestParams) {
    return await this.request(Object.assign({method: 'GET'}, opts))
  }

  async post (opts: Taro.RequestParams) {
    return await this.request(Object.assign({method: 'POST'}, opts))
  }

  beforeRequest (chain: Chain) {
    const requestParams = chain.requestParams
    requestParams.url = this.baseUrl + requestParams.url
    requestParams.dataType = 'json'

    return chain.proceed(requestParams)
  }

  async request (opts: Taro.RequestParams) {
    Taro.addInterceptor(this.beforeRequest.bind(this))

    const res = await Taro.request(opts)
    return res.data
  }
}

export default new Http()
