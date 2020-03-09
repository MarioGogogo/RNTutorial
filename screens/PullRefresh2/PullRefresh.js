'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class PullAndLoadScreen extends Component {
  static defaultProps = {
    data                   : [],
    ItemSeparatorComponent : () => {
      return <View style={styles.baseLine} />; //行与行之间的分隔线组件。不会出现在第一行之前和最后一行之
    },
    ListEmptyComponent     : () => {
      return (
        <View style={styles.noListView}>
          <Text style={styles.NoListText}>这里空空如也~</Text>
        </View>
      );
    },
    refreshing             : false,
    animating              : true,
    ItmeHeight             : 50
  };

  constructor(props) {
    super(props);
  }

  _ListFooterComponent = () => {
    const { data, nomore, animating } = this.props;
    return (
      <View style={styles.bottomfoot}>
        {data.length != 0 ? nomore ? (
          <Text style={styles.footText}>- 我是有底线的 -</Text>
        ) : (
          <View style={styles.activeLoad}>
            <ActivityIndicator size='small' animating={animating} />
            <Text style={[ styles.footText, styles.ml ]}>加载更多...</Text>
          </View>
        ) : null}
      </View>
    );
  };
  _renderItem = (item) => {
    return this.props.renderItem(item);
  };

  render() {
    const {
      data,
      keyExtractor,
      onEndReached,
      ItemSeparatorComponent,
      ListEmptyComponent,
      refreshing,
      colors,
      progressBackgroundColor,
      onRefresh
    } = this.props;
    return (
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        refreshing={true}
        renderItem={({ item }) => this._renderItem(item)}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={this._ListFooterComponent}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={colors}
            progressBackgroundColor={progressBackgroundColor}
            onRefresh={onRefresh}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  baseLine   : {
    width           : width,
    height          : 1,
    backgroundColor : '#eeeeee'
  },
  noListView : {
    width          : width,
    height         : height - 140,
    justifyContent : 'center',
    alignItems     : 'center'
  },
  NoListText : {
    marginTop : 15,
    fontSize  : 18,
    color     : '#999999'
  },
  bottomfoot : {
    flexDirection  : 'row',
    justifyContent : 'center',
    alignItems     : 'center',
    padding        : 10
  },
  footText   : {
    marginTop : 5,
    fontSize  : 12,
    color     : '#999999'
  },
  activeLoad : {
    flexDirection  : 'row',
    justifyContent : 'center',
    alignItems     : 'center'
  },
  ml         : {
    marginLeft : 10
  }
});
