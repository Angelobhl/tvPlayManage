import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import {AccountItem} from '../../types/accounts'
import {saveAccount, getAccountItemByIndex, delAccount} from '../../api/account'

import "taro-ui/dist/style/components/flex.scss"
import 'taro-ui/dist/style/components/form.scss' // 按需引入
import 'taro-ui/dist/style/components/input.scss' // 按需引入
import 'taro-ui/dist/style/components/modal.scss' // 按需引入
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

interface AccountEditState {
  accountItem: AccountItem,
  delModalShow: boolean
}

export default class AccountEdit extends Component<{}, AccountEditState> {
  $instance: Taro.Current = getCurrentInstance()
  index: number

  constructor (prop: {}) {
    super(prop)

    this.state = {
      accountItem: {
        index: 1,
        name: '',
        endLine: '',
        account: ''
      },
      delModalShow: false
    }
  }

  async componentDidShow () {
    const {keys} = Taro.getStorageInfoSync()
    this.index = +this.$instance.router.params.index || 0

    const accountItem: AccountItem = await getAccountItemByIndex(this.index)

    if (accountItem.index) {
      this.setState({
        accountItem: {...accountItem}
      })
    } else {
      Taro.switchTab({
        url: '/pages/accounts/list'
      })
    }
  }

  handleNameChange (name: string) {
    this.setState({
      accountItem: Object.assign(this.state.accountItem, {name})
    })
  }

  handleAccountChange (account: string) {
    this.setState({
      accountItem: Object.assign(this.state.accountItem, {account})
    })
  }

  handleEndLineChange (endLine: string) {
    this.setState({
      accountItem: Object.assign(this.state.accountItem, {endLine})
    })
  }

  async handleSubmit () {
    if (!this.state.accountItem.name || !this.state.accountItem.account || !this.state.accountItem.endLine) {
      Taro.showToast({
        title: '全部必填',
        icon: 'none'
      })
      return false
    }

    const code: number = await saveAccount(this.state.accountItem)
    if (code === 0) {
      Taro.switchTab({
        url: '/pages/accounts/list'
      })
    }
  }

  handleModelShow (show: boolean) {
    this.setState({
      delModalShow: show
    })
  }

  async fConfirmDel () {
    const code: number = await delAccount(this.state.accountItem.index)
    if (code === 0) {
      this.handleModelShow(false)
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
              value={this.state.accountItem.name}
              onChange={this.handleNameChange.bind(this)}
            />
          </FormField>
          <FormField label="平台账号">
            <AtInput
              name='account'
              type='text'
              placeholder='请输入平台账号'
              value={this.state.accountItem.account}
              onChange={this.handleAccountChange.bind(this)}
            />
          </FormField>
          <FormField label="到期时间">
            <Picker mode="date" onChange={(e) => this.handleEndLineChange(e.detail.value)} value={this.state.accountItem.endLine}>
              <AtList>
                <AtListItem title='请选择时间' extraText={this.state.accountItem.endLine} />
              </AtList>
            </Picker>
          </FormField>
          <View className="at-row at-row__justify--around">
            <View className="at-col at-col-5">
              <AtButton type="secondary" size="small" circle={true} onClick={() => this.handleModelShow(true)}>删除</AtButton>
            </View>
            <View className="at-col at-col-5">
              <AtButton type="primary" size="small" circle={true} onClick={this.handleSubmit.bind(this)}>保存</AtButton>
            </View>
          </View>
        </AtForm>
        <AtModal isOpened={this.state.delModalShow}>
          <AtModalHeader>删除会员</AtModalHeader>
          <AtModalContent>
            <View>确认删除会员【{this.state.accountItem.name}】吗？</View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={() => this.handleModelShow(false)}>取消</Button>
            <Button onClick={this.fConfirmDel.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
