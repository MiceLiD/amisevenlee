import { Component } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import logo from './logo.jpeg'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null
    }
  }

  componentWillMount () {}

  componentDidMount () {}

  onAuth() {
    Taro.getUserProfile({
      desc: '展示个人信息',
      success: (data) => {
        const { userInfo } = data
        console.log(userInfo)
        this.setState({
          userInfo
        })
      },
      fail: () => {
        this.setState({
          userInfo: { nickName: '未授权' }
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { userInfo } = this.state
    return (
      <View className='index'>
        <View>{ userInfo ? userInfo.nickName : '?' }</View>
        <Image style='width: 80px;height: 80px;margin: 20px 0' src={userInfo ? userInfo.avatarUrl : logo}></Image>
        { !userInfo ? <Button type='primary' style='width: 80px;font-size: 12px' onClick={this.onAuth.bind(this)}>点击授权</Button> : <View>你好，尊贵的普通微信会员</View> }
      </View>
    )
  }
}
