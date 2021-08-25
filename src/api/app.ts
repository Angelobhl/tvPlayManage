import Http from '../util/http'
import Taro from '@tarojs/taro'

export const wxLogin = async function (wxCode: string): Promise<string> {
  let openId: string = ''

  const {code, data: {openid}} = await Http.get({
    url: '/wechat/login',
    data: { code: wxCode }
  })

  if (code === 0) {
    openId = openid
  } else {
    Taro.showToast({
      title: '登录失败',
      icon: 'none'
    })
  }

  return openId
}
