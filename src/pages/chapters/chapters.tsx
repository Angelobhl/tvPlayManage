import { Component, createRef } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ChapterList from '../index/chapterList'
import {chapterData, ChapterListItemProp} from '../../types/common'
import {aPlatform} from '../../util/const'

import './chapters.scss'

let oPlatform = {}
aPlatform.forEach(item => {
  oPlatform[item.value] = item.label
})

export default class Chapters extends Component {
  chapterListRef: React.RefObject<ChapterList>

  constructor (props: {}) {
    super(props)

    this.chapterListRef = createRef()
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    const {keys} = Taro.getStorageInfoSync()
    if (keys.length > 0) {
      const data = Taro.getStorageSync('chapter')
      if (data) {
        const aChapterData: chapterData[] = JSON.parse(data)
        let item: chapterData
        let aList: ChapterListItemProp[] = []
        for (item of aChapterData) {
          aList.push({
            index: item.index,
            title: item.title,
            chapterNum: item.isEnd ? '已完结' : '',
            platform: oPlatform[item.platform]
          })
        }

        this.chapterListRef.current && this.chapterListRef.current.fSetList(aList)
      }
    }
  }

  componentDidHide () { }

  render () {
    return (
      <View className='chapterList'>
        <ChapterList ref={this.chapterListRef} />
      </View>
    )
  }
}
