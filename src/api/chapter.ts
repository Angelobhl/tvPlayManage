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
