import React from "react"
import { View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtRadio, AtList, AtListItem } from 'taro-ui'
import {WaitingItem} from '../../types/common'
import {aPlatform, aType} from '../../util/const'
import {getWaitingItemByIndex, saveWaiting, delWaiting} from '../../api/waiting'

import "taro-ui/dist/style/components/flex.scss"
import 'taro-ui/dist/style/components/form.scss' // 按需引入
import 'taro-ui/dist/style/components/input.scss' // 按需引入
import 'taro-ui/dist/style/components/button.scss' // 按需引入
import 'taro-ui/dist/style/components/radio.scss' // 按需引入
import 'taro-ui/dist/style/components/list.scss' // 按需引入
import 'taro-ui/dist/style/components/icon.scss' // 按需引入
import './form.scss'

function FormField (props: {label: string, children: React.ReactNode}) {
  return (
    <View className="form-field-item">
      <View className="form-field-item-label">{props.label}</View>
      <View className="form-field-item-content">{props.children}</View>
    </View>
  )
}

export default class WaitingForm extends React.Component<{}, WaitingItem> {
  $instance: Taro.Current = getCurrentInstance()

  constructor (prop: {}) {
    super(prop)

    this.state = {
      index: 0,
      title: '',
      date: '',
      type: '',
      platform: ''
    }
  }

  async componentDidShow () {
    let item: WaitingItem = {
      index: 0,
      title: '',
      date: '',
      type: '',
      platform: ''
    }
    const index: number = +this.$instance.router.params.index

    if (index) {
      item = await getWaitingItemByIndex(index)
    }

    this.setState(item)
  }

  handleTitleInput (title: string) {
    this.setState({
      title
    })
  }

  handlePlatformChange (platform: string) {
    this.setState({
      platform
    })
  }

  handleTypeChange (type: string) {
    this.setState({
      type
    })
  }

  handleDateChange (date: string) {
    this.setState({
      date
    })
  }

  async handleSave () {
    const code: number = await saveWaiting(this.state)
    if (code === 0) {
      Taro.switchTab({
        url: '/pages/waiting/list'
      })
    }
  }

  handleBeWatching () {
    Taro.redirectTo({
      url: `/pages/add/add?waiting=${this.state.index}`
    })
  }

  async handleDel () {
    if (this.state.index > 0) {
      const code = await delWaiting(this.state.index)
      if (code === 0) {
        Taro.switchTab({
          url: '/pages/waiting/list'
        })
      }
    }
  }

  render () {
    return (
      <View className="waiting-form-page">
        <AtForm>
          <FormField label="剧名">
            <AtInput
              name='value'
              type='text'
              placeholder='请输入剧名'
              value={this.state.title}
              onChange={this.handleTitleInput.bind(this)}
            />
          </FormField>
          <FormField label="类型">
            <AtRadio
              options={aType}
              value={this.state.type}
              onClick={this.handleTypeChange.bind(this)}
            />
          </FormField>
          <FormField label="平台">
            <AtRadio
              options={aPlatform}
              value={this.state.platform}
              onClick={this.handlePlatformChange.bind(this)}
            />
          </FormField>
          <FormField label="上线时间">
            <Picker mode="date" onChange={(e) => this.handleDateChange(e.detail.value)} value={this.state.date}>
              <AtList>
                <AtListItem title='请选择时间' extraText={this.state.date} />
              </AtList>
            </Picker>
          </FormField>
          <AtButton type="primary" size="small" circle={true} onClick={this.handleSave.bind(this)}>保存</AtButton>
          {
            this.state.index > 0 ? (
          <View className="at-row at-row__justify--around" style="margin-top: 10px;">
            <View className="at-col at-col-5">
              <AtButton type="primary" size="small" circle={true} onClick={this.handleBeWatching.bind(this)}>开始追</AtButton>
            </View>
            <View className="at-col at-col-5">
              <AtButton type="primary" size="small" circle={true} onClick={this.handleDel.bind(this)}>删除</AtButton>
            </View>
          </View>
            ) : <View></View>
          }
        </AtForm>
      </View>
    )
  }
}
