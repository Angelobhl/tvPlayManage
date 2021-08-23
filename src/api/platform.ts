import { PlatformItem } from '../types/common'
import Http from '../util/http'
import Taro from '@tarojs/taro'

export const getList = async function (): Promise<PlatformItem[]> {
  let aPlatform: PlatformItem[] = []
  const {code, data: {aList}} = await Http.get({
    url: '/platform/list'
  })
  if (code === 0) {
    aPlatform = aList
  }

  return aPlatform
}

export const getChapterItemByIndex = async function (value: string): Promise<PlatformItem> {
  let item: PlatformItem

  const {code, data} = await Http.get({
    url: '/platform/item?value=' + value
  })
  if (code === 0) {
    return data as PlatformItem
  }

  return item
}

export const savePlatform = async function (plaftormItem: PlatformItem): Promise<number> {
  const {code, message} = await Http.post({
    url: '/platform/save',
    data: plaftormItem
  })

  if (code !== 0) {
    Taro.showToast({
      title: message,
      icon: 'none'
    })
  }

  return code
}

export const delPlatform = async function (value: string): Promise<number> {
  const {code, message} = await Http.post({
    url: '/platform/del',
    data: {value: value}
  })

  if (code !== 0) {
    Taro.showToast({
      title: message,
      icon: 'none'
    })
  }

  return code
}
