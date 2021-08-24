import { Component, createRef } from 'react'
import { View } from '@tarojs/components'
import ChapterList from '../index/chapterList'
import {chapterData, ChapterListItemProp} from '../../types/common'
import {aPlatform} from '../../util/const'
import {getList} from '../../api/chapter'

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

  async componentDidShow () {
    const aChapterData: chapterData[] = await getList()
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

  componentDidHide () { }

  render () {
    return (
      <View className='chapterList'>
        <ChapterList ref={this.chapterListRef} />
      </View>
    )
  }
}
