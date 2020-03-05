import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import HeaderIconButtonExample from '../../common/Header';
const demoItems = [ 'Timing1', '展开列表动画' ];

export default class EntryAnimation extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderIconButtonExample title='动画列表' />
        <FlatList data={demoItems} renderItem={this._renderItem} keyExtractor={(index) => String(index)} />
      </View>
    );
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight underlayColor={'#ccc'} onPress={() => this.onClickListItem(item, index)}>
        <View style={styles.listItem}>
          <Text style={styles.title}>{item}</Text>
          <Icon name={'chevron-right'} size={24} color={'#999'} />
        </View>
      </TouchableHighlight>
    );
  };

  onClickListItem(item, index) {
    switch (index) {
      case 0:
        Actions.entry1({ title: 'Timing1' });
        break;
      case 1:
        Actions.spreadlist({ title: '展开列表动画' });
        break;
      case 2:
        Actions.scanqrcode({ title: '二维码扫描动画' });
        break;
      case 3:
        Actions.menubutton({ title: '菜单按钮动画' });
        break;
      case 4:
        Actions.alert({ title: '弹窗动画' });

        break;
      case 5:
        Actions.loading({ title: 'Loading动画' });

        break;
      case 6:
        Actions.danmu({ title: '模拟弹幕动画' });
        break;
      case 7:
        Actions.scrollcard({ title: '卡片滑动缩放动画' });
        break;
      case 8:
        Actions.entryanimation({ title: '入门动画' });
        break;
    }
  }
}

export const styles = StyleSheet.create({
  container : {
    flex            : 1,
    backgroundColor : '#f0f0f0'
  },
  listItem  : {
    flexDirection     : 'row',
    alignItems        : 'center',
    paddingLeft       : 10,
    paddingRight      : 10,
    height            : 50,
    backgroundColor   : 'white',
    borderBottomColor : '#dcdcdc',
    borderBottomWidth : 1 / PixelRatio.get()
  },
  title     : {
    fontSize : 15,
    color    : '#666',
    flex     : 1
  }
});
