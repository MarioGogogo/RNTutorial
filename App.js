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
import PullRefreshScreen from './screens/PullRefresh';
import TexTInputScreen from './screens/TextInput';
import RegisterScreen from './screens/TextInput/RegisterScreen';
import AutoNewLineInputScreen from './screens/TextInput/AutoNewLineInput';
import AutoHeightInputScreen from './screens/TextInput/AutoHeightInput';
import AnimationListScreen from './screens/AnimationList';
import ShoppingButtonDemo from './screens/AnimationList/Demos/ShoppingButtonDemo';
import ShoppingToCartDemo from './screens/AnimationList/Demos/ShoppingToCartDemo';
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
          <Scene hideNavBar key='pullrefresh' component={PullRefreshScreen} />
          <Scene hideNavBar key='textinput' component={TexTInputScreen} />
          <Scene hideNavBar key='register' component={RegisterScreen} />
          <Scene hideNavBar key='autonewlineinput' component={AutoNewLineInputScreen} />
          <Scene hideNavBar key='autoheightinput' component={AutoHeightInputScreen} />
          <Scene hideNavBar key='animationlist' component={AnimationListScreen} />
          <Scene hideNavBar key='shoppingbutton' component={ShoppingButtonDemo} />
          <Scene hideNavBar key='shoppingtocart' component={ShoppingToCartDemo} />
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
