import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtList, AtListItem } from 'taro-ui'
import {AccountItem} from '../../types/accounts'
import {saveAccount} from '../../api/account'

import 'taro-ui/dist/style/components/form.scss' // 按需引入
import 'taro-ui/dist/style/components/input.scss' // 按需引入
import 'taro-ui/dist/style/components/button.scss' // 按需引入
import 'taro-ui/dist/style/components/list.scss' // 按需引入
import 'taro-ui/dist/style/components/icon.scss' // 按需引入
import './account.scss'

function FormField (props: {label: string, children: React.ReactNode}) {
  return (
    <View className="form-field-item">
      <View className="form-field-item-label">{props.label}</View>
      <View className="form-field-item-content">{props.children}</View>
    </View>
  )
}

export default class AccountAdd extends Component<{}, AccountItem> {
  constructor (prop: {}) {
    super(prop)

    this.state = {
      index: 0,
      name: '',
      endLine: '',
      account: ''
    }
  }

  componentDidShow () {}

  handleNameChange (name: string) {
    this.setState({
      name
    })
  }

  handleAccountChange (account: string) {
    this.setState({
      account
    })
  }

  handleEndLineChange (endLine: string) {
    this.setState({
      endLine
    })
  }

  async handleSubmit () {
    if (!this.state.name || !this.state.account || !this.state.endLine) {
      Taro.showToast({
        title: '全部必填',
        icon: 'none'
      })
      return false
    }

    const code = await saveAccount(this.state)
    if (code === 0) {
      Taro.switchTab({
        url: '/pages/accounts/list'
      })
    }
  }

  render () {
    return (
      <View className="account-add">
        <AtForm>
          <FormField label="平台名称">
            <AtInput
              name='value'
              type='text'
              placeholder='请输入平台名称'
              value={this.state.name}
              onChange={this.handleNameChange.bind(this)}
            />
          </FormField>
          <FormField label="平台账号">
            <AtInput
              name='account'
              type='text'
              placeholder='请输入平台账号'
              value={this.state.account}
              onChange={this.handleAccountChange.bind(this)}
            />
          </FormField>
          <FormField label="到期时间">
            <Picker mode="date" onChange={(e) => this.handleEndLineChange(e.detail.value)} value={this.state.endLine}>
              <AtList>
                <AtListItem title='请选择时间' extraText={this.state.endLine} />
              </AtList>
            </Picker>
          </FormField>
          <AtButton type="primary" size="small" circle={true} onClick={this.handleSubmit.bind(this)}>保存</AtButton>
        </AtForm>
      </View>
    )
  }
}
