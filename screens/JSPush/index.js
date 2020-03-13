import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import JPushModule from 'jpush-react-native';

export default class App extends Component {
  state = {
    alias : 'rn001' //设备别名
  };
  componentDidMount() {
    if (Platform.OS === 'android') {
      // JPushModule.initPush();
      // // 设置android端监听
      // JPushModule.notifyJSDidLoad((resultCode) => {
      //   if (resultCode === 0) {
      //     console.log('设置监听成功');
      //   }
      //   JPushModule.addGetRegistrationIdListener((registrationId) => {
      //     console.log('设备注册成功，registrationId: ' + registrationId);
      //   });
      // });
      if (Platform.OS === 'android') {
        JPushModule.initPush();
      } else {
        JPushModule.setupPush();
      }
      JPushModule.setAlias(
        this.state.alias,
        () => {
          console.log('成功设置 alias');
        },
        () => {
          console.log('设置 alias 失败');
        }
      );
      JPushModule.addReceiveCustomMsgListener((ret) => {
        const data = JSON.parse(ret.extras);
        this.setState({ id: data.id });
      });
      JPushModule.addReceiveNotificationListener(() => {});
      JPushModule.addReceiveOpenNotificationListener(() => {
        this.props.navigation.navigate('Article', { id: this.state.id, type: '推荐' });
      });
      JPushModule.addGetRegistrationIdListener(
        (registrationId) => {
          console.log(`Device register succeed, registrationId ${registrationId}`);
        },
        (error) => {
          console.error(`获取不到`, error);
        }
      );
    }
    JPushModule.addReceiveNotificationListener((map) => {
      console.log('收到推送消息');
      console.log(map);
      // TODO: 处理通知消息
    });
    JPushModule.addReceiveOpenNotificationListener((map) => {
      console.log('监听到点击通知的事件');
      console.log(map);
      // TODO: 跳转界面
    });
  }

  componentWillUnmount() {
    console.log('Will clear all notifications');
    JPushModule.clearAllNotifications();
  }

  render() {
    return (
      <View>
        <Text>button</Text>
      </View>
    );
  }
}
