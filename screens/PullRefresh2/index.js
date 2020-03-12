//
//  Created by Liu Jinyong on 17/4/5.
//  Copyright © 2016年 Liu Jinyong. All rights reserved.
//
//  @flow
//  Github:
//  https://github.com/huanxsd/react-native-refresh-list-view

import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import RefreshListView, { RefreshState } from './RefreshListView';
import HeaderIconButtonExample from '../common/Header';
class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList     : [],
      refreshState : RefreshState.Idle
    };
  }

  componentDidMount() {
    this.onHeaderRefresh();
  }

  // 获取测试数据
  getTestList(isReload) {
    let newList = Array(10)
      .fill('')
      .map((_, i) => ({ key: `${new Date().getTime() + i}`, text: `item #${i}`, total: 30 }));
    return isReload ? (Math.random() < 0.2 ? [] : newList) : [ ...this.state.dataList, ...newList ];
  }

  onHeaderRefresh = () => {
    console.log('2秒刷新');
    this.setState({ refreshState: RefreshState.HeaderRefreshing });

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      // if (Math.random() < 0.2) {
      //   this.setState({ refreshState: RefreshState.Failure });
      //   return;
      // }

      //获取测试数据
      let dataList = this.getTestList(true);

      const state =
        dataList.length < 1
          ? RefreshState.EmptyData
          : dataList.length >= dataList[0].total ? RefreshState.NoMoreData : RefreshState.Idle;

      this.setState({
        dataList     : dataList,
        refreshState : state,
        total        : dataList[0] && dataList[0].total
      });
    }, 2000);
  };

  onFooterRefresh = () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing });
    console.log('底部加载');

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      if (Math.random() < 0.2) {
        this.setState({ refreshState: RefreshState.Failure });
        return;
      }

      //获取测试数据
      let dataList = this.getTestList(false);
      console.log('加载数据', dataList.length);
      this.setState({
        dataList     : dataList,
        refreshState : dataList.length >= this.state.total ? RefreshState.NoMoreData : RefreshState.Idle
      });
    }, 2000);
  };

  keyExtractor = (item, index) => {
    return item.key.toString();
  };

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text>{item.text}</Text>
      </View>
    );
  }

  render() {
    console.log('render scene');
    return (
      <View style={styles.container}>
        <HeaderIconButtonExample />
        <RefreshListView
          data={this.state.dataList}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
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
    height          : 80
  }
});

export default Demo;
