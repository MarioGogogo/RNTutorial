/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import ListViewPage from './screens/ListView';
import Home from './screens/Home';
import FlatListPage from './screens/FlatList';
import SimpleListScreen from './screens/ListView/SimpleListScreen';
import SectionListScreen from './screens/ListView/SectionListScreen';
import GroupListScreen from './screens/ListView/GroupListScreen';
import GridLayoutScreen from './screens/ListView/GridLayoutScreen';
import SectionListPage from './screens/SectionList';
import SwipeListView from './screens/SwipeList';
import PullRefreshScreen from './screens/PullRefresh';
import PullRefreshScreen2 from './screens/PullRefresh2';
import TexTInputScreen from './screens/TextInput';
import RegisterScreen from './screens/TextInput/RegisterScreen';
import AutoNewLineInputScreen from './screens/TextInput/AutoNewLineInput';
import AutoHeightInputScreen from './screens/TextInput/AutoHeightInput';
import AnimationListScreen from './screens/AnimationList';
import ShoppingButtonDemo from './screens/AnimationList/Demos/ShoppingButtonDemo';
import ShoppingToCartDemo from './screens/AnimationList/Demos/ShoppingToCartDemo';
import ScanQRCodeAnimation from './screens/AnimationList/Demos/ScanQRCodeAnimation';
import MenuButtonAnimation from './screens/AnimationList/Demos/MenuButtonAnimation';
import AlertAnimation from './screens/AnimationList/Demos/AlertAnimation';
import LoadingAnimation from './screens/AnimationList/Demos/LoadingAnimation';
import DanmuAnimation from './screens/AnimationList/Demos/DanmuAnimation';
import ScrollCardAnimation from './screens/AnimationList/Demos/ScrollCardAnimation';
import EntryAnimation from './screens/AnimationList/Entry';
import TimingAnimation from './screens/AnimationList/Entry/TimingAnimation';
import SpreadList from './screens/AnimationList/Entry/SpreadList';

//来自YouTube的demo
import MusicAppLogin from './screens/Youtube/MusicApp';
import AddButton from './screens/Youtube/AddButton';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='home' hideNavBar component={Home} />
          <Scene key='listview' hideNavBar component={ListViewPage} />
          <Scene key='simplelistscreen' hideNavBar component={SimpleListScreen} />
          <Scene key='sectionlistscreen' hideNavBar component={SectionListScreen} />
          <Scene key='grouplistscreen' hideNavBar component={GroupListScreen} />
          <Scene key='gridlayoutscreen' hideNavBar component={GridLayoutScreen} />
          <Scene hideNavBar key='flatlist' component={FlatListPage} />
          <Scene hideNavBar key='sectionlist' component={SectionListPage} />
          <Scene hideNavBar key='swipelist' component={SwipeListView} />
          <Scene hideNavBar key='pullrefresh' component={PullRefreshScreen} />
          <Scene hideNavBar key='pullrefresh2' component={PullRefreshScreen2} />
          <Scene hideNavBar key='textinput' component={TexTInputScreen} />
          <Scene hideNavBar key='register' component={RegisterScreen} />
          <Scene hideNavBar key='autonewlineinput' component={AutoNewLineInputScreen} />
          <Scene hideNavBar key='autoheightinput' component={AutoHeightInputScreen} />
          <Scene hideNavBar key='animationlist' component={AnimationListScreen} />
          <Scene hideNavBar key='shoppingbutton' component={ShoppingButtonDemo} />
          <Scene hideNavBar key='shoppingtocart' component={ShoppingToCartDemo} />
          <Scene hideNavBar key='scanqrcode' component={ScanQRCodeAnimation} />
          <Scene hideNavBar key='menubutton' component={MenuButtonAnimation} />
          <Scene hideNavBar key='alert' component={AlertAnimation} />
          <Scene hideNavBar key='loading' component={LoadingAnimation} />
          <Scene hideNavBar key='danmu' component={DanmuAnimation} />
          <Scene hideNavBar key='scrollcard' component={ScrollCardAnimation} />
          <Scene hideNavBar key='entryanimation' component={EntryAnimation} />
          <Scene hideNavBar key='entry1' component={TimingAnimation} />
          <Scene hideNavBar key='spreadlist' component={SpreadList} />

          {/* 来自YouTube的demo */}
          <Scene hideNavBar key='musicapp' component={MusicAppLogin} />
          <Scene hideNavBar key='addbutton' component={AddButton} />
        </Scene>
        {/* Loading和Toash全局加载 */}
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container    : {
    flex            : 1,
    justifyContent  : 'center',
    alignItems      : 'center',
    backgroundColor : '#F5FCFF'
  },
  welcome      : {
    fontSize  : 20,
    textAlign : 'center',
    margin    : 10
  },
  instructions : {
    textAlign    : 'center',
    color        : '#333333',
    marginBottom : 5
  }
});
