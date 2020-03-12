import React, { Component } from 'react';
import { Text, View } from 'react-native';
import JPushModule from 'jpush-react-native';

export default class index extends Component {
  componentDidMount() {
    // 在收到点击事件之前调用此接口
    JPushModule.notifyJSDidLoad((resultCode) => {
      if (resultCode === 0) {
      }
    });
    JPushModule.addReceiveNotificationListener((map) => {
      console.log('alertContent: ' + map.alertContent);
      console.log('extras: ' + map.extras);
      // var extra = JSON.parse(map.extras);
      // console.log(extra.key + ": " + extra.value);
    });
  }
  //点击通知   在用户点击通知后，将会触发此事件。
  componentDidMount() {
    JPushModule.addGetRegistrationIdListener((registrationId) => {
      console.log('Device register succeed, registrationId ' + registrationId);
    });
  }
  //   清除所有通知
  // 建议在用户退出前台后调用。
  componentWillUnmount() {
    console.log('Will clear all notifications');
    JPushModule.clearAllNotifications();
  }

  setTag() {
    if (this.state.tag !== undefined) {
      /*
        * 请注意这个接口要传一个数组过去，这里只是个简单的示范
        */

      JPushModule.setTags(
        [ 'VIP', 'NOTVIP' ],
        () => {
          console.log('Set tag succeed');
        },
        () => {
          console.log('Set tag failed');
        }
      );
    }
  }
  setAlias() {
    if (this.state.alias !== undefined) {
      JPushModule.setAlias(
        this.state.alias,
        () => {
          console.log('Set alias succeed');
        },
        () => {
          console.log('Set alias failed');
        }
      );
    }
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
