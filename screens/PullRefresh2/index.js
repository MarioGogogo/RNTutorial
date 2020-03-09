import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import HeaderIconButtonExample from '../common/Header';
import PullRefresh from './PullRefresh';
const height = Dimensions.get('window').height;
const datas = Array(10).fill('').map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

export default class PullRefresh2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data       : [],
      pageSize   : 0,
      nomore     : false,
      show       : false,
      rightTitle : '编辑'
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

  RandomData = () => {
    return Array(10)
      .fill('')
      .map((_, i) => ({ key: `${Math.ceil(Math.random() * 1000)}`, text: `item #${Math.ceil(Math.random() * 1000)}` }));
  };

  load = () => {
    //初始化加载一次
    console.log('刷新请求');
    setTimeout(() => {
      this.setState({
        data : this.RandomData().concat(this.state.data)
      });
    }, 1000);
  };

  loadNext = () => {
    if (!this.state.nomore && this.onEndReachedCalled) {
      console.log('下一页请求');
      this.setState({
        nomore : true,
        data   : this.state.data.concat(this.RandomData())
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
  fn = () => {
    this.setState({
      rightTitle : '取消',
      show       : true
    });
  };
  change = () => {
    this.setState(
      {
        rightTitle : '编辑',
        show       : false
      },
      () => {
        this.load();
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderIconButtonExample cancel={this.fn} rightTitle={this.state.rightTitle} />
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
        {this.state.show && (
          <TouchableOpacity
            style={{ backgroundColor: 'red', width: 60, height: 60, position: 'absolute', right: 10, bottom: 120 }}
            onPress={this.change}
          >
            <Text>点击状态改变</Text>
          </TouchableOpacity>
        )}
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
