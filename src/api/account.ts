import { AccountItem } from '../types/accounts'
import Http from '../util/http'
import Taro from '@tarojs/taro'

export const getList = async function (): Promise<AccountItem[]> {
  let aAccountItem: AccountItem[] = []
  const {code, data: {aList}} = await Http.get({
    url: '/account/list'
  })
  if (code === 0) {
    aAccountItem = aList
  }

  return aAccountItem
}

export const saveAccount = async function (account: AccountItem): Promise<number> {
  const {code, message} = await Http.post({
    url: '/account/save',
    data: account
  })

  if (code !== 0) {
    Taro.showToast({
      title: message,
      icon: 'none'
    })
  }

  return code
}

export const delAccount = async function (index: number): Promise<number> {
  const {code, message} = await Http.post({
    url: '/account/del',
    data: {index: index}
  })

  if (code !== 0) {
    Taro.showToast({
      title: message,
      icon: 'none'
    })
  }

  return code
}
