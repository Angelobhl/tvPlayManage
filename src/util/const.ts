import Taro from '@tarojs/taro'

export const aType = [
  { label: '电视剧', value: 'tvplay' },
  { label: '综艺', value: 'varietyshow' },
  { label: '动漫', value: 'cartoon' }
]

let platformStorage = []
const {keys} = Taro.getStorageInfoSync()
if (keys.length > 0) {
  const data = Taro.getStorageSync('platform')
  if (data) {
    platformStorage = JSON.parse(data)
  }
}

export const aPlatform = platformStorage.length ? platformStorage : [
  { label: '爱奇艺', value: 'iqiyi' },
  { label: '腾讯', value: 'tt' },
  { label: '芒果TV', value: 'mgtv' },
  { label: '优酷', value: 'youku' },
  { label: '哔哩哔哩', value: 'bilibili' }
]
