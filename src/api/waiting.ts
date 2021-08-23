import { WaitingItem } from '../types/common'
import Http from '../util/http'
import Taro from '@tarojs/taro'

export const getList = async function (): Promise<WaitingItem[]> {
  let aWaiting: WaitingItem[] = []
  const {code, data: {aList}} = await Http.get({
    url: '/waiting/list'
  })
  if (code === 0) {
    aWaiting = aList
  }

  return aWaiting
}

export const getWaitingItemByIndex = async function (index: number): Promise<WaitingItem> {
  let item: WaitingItem

  const {code, data} = await Http.get({
    url: '/waiting/item?index=' + index
  })
  if (code === 0) {
    return data as WaitingItem
  }

  return item
}

export const saveWaiting = async function (waitingItem: WaitingItem): Promise<number> {
  const {code, message} = await Http.post({
    url: '/waiting/save',
    data: waitingItem
  })

  if (code !== 0) {
    Taro.showToast({
      title: message,
      icon: 'none'
    })
  }

  return code
}

export const delWaiting = async function (index: number, noToast: boolean = true): Promise<number> {
  const {code, message} = await Http.post({
    url: '/waiting/del',
    data: {index: index}
  })

  if (code !== 0 && !noToast) {
    Taro.showToast({
      title: message,
      icon: 'none'
    })
  }

  return code
}
