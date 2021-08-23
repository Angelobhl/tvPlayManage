import { chapterData } from '../types/common'
import Http from '../util/http'
import Taro from '@tarojs/taro'

export const getList = async function (): Promise<chapterData[]> {
  let aChapterData: chapterData[] = []
  const {code, data: {aList}} = await Http.get({
    url: '/chapter/list'
  })
  if (code === 0) {
    aChapterData = aList
  }

  return aChapterData
}

export const getChapterItemByIndex = async function (index: number): Promise<chapterData> {
  let item: chapterData

  const {code, data} = await Http.get({
    url: '/chapter/item?index=' + index
  })
  if (code === 0) {
    return data as chapterData
  }

  return item
}

export const saveChapter = async function (chapter: chapterData): Promise<number> {
  const {code, message} = await Http.post({
    url: '/chapter/save',
    data: chapter
  })

  if (code !== 0) {
    Taro.showToast({
      title: message,
      icon: 'none'
    })
  }

  return code
}

export const delChapter = async function (index: number): Promise<number> {
  const {code, message} = await Http.post({
    url: '/chapter/del',
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
