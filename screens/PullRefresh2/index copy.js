import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import HeaderIconButtonExample from '../common/Header';
import PullRefresh from './PullRefresh';
const height = Dimensions.get('window').height;
const datas = Array(16).fill('').map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

const datas2 = Array(10).fill('').map((_, i) => ({ key: `${100 + i}`, text: `item #${100 + i}` }));

console.log(datas);

export default class PullRefresh2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data     : [],
      pageSize : 0,
      nomore   : false
    };
  }

  componentDidMount() {
    const ListNums = this.fullScreenJusting(50);
    console.log('一个屏幕满足多少条目', ListNums);
    this.onEndReachedCalled = false; //初始化不刷新

    setTimeout(() => {
      this.setState({
        data     : datas,
        pageSize : ListNums,
        nomore   : datas.length <= ListNums ? true : false
      });
    }, 1000);
  }

  //满屏页面判断
  fullScreenJusting(ItemHeight) {
    const screnHeight = height; //屏幕高度
    //计算列表个数
    const listNum = (screnHeight - 150) / ItemHeight;
    return Math.ceil(listNum);
  }

  load = () => {
    //初始化加载一次
    console.log('刷新请求');
    setTimeout(() => {
      this.setState({
        data : datas2.concat(datas)
      });
    }, 2000);
  };

  loadNext = () => {
    if (!this.state.nomore && this.onEndReachedCalled) {
      console.log('下一页请求');
      this.setState({
        nomore : true
      });
    }
    this.onEndReachedCalled = true;
  };
  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text>{item.text}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderIconButtonExample />
        <PullRefresh
          data={this.state.data}
          keyExtractor={(item, index) => item.key.toString()}
          onEndReached={this.loadNext}
          colors={'#fff'}
          nomore={this.state.nomore}
          progressBackgroundColor={'#fff'}
          onRefresh={this.load}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex            : 1,
    backgroundColor : '#ffffff'
  },
  item      : {
    flexDirection   : 'row',
    justifyContent  : 'center',
    alignItems      : 'center',
    backgroundColor : '#ffffff',
    height          : 50
  }
});
