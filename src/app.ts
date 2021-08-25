import { Component } from 'react'
import './app.scss'
import Taro from '@tarojs/taro'
import {setStorage} from './util/common'
import {wxLogin} from './api/app'

class App extends Component {

  componentDidMount () {}

  async componentDidShow () {
    try {
      await Taro.checkSession()
    } catch (e) {
      setStorage('openId', '')
      this.wechatLogin()
    }
  }

  async wechatLogin () {
    try {
      const {code} = await Taro.login()
      const openId: string = await wxLogin(code)
      if (openId) {
        setStorage('openId', openId)
      }
    } catch (e) {}
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
