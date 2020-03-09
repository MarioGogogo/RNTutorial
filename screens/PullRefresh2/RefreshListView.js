import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const RefreshState = {
  Idle             : 0,
  HeaderRefreshing : 1,
  FooterRefreshing : 2,
  NoMoreData       : 3,
  Failure          : 4,
  EmptyData        : 5
};

export default class RefreshListView extends PureComponent {
  static defaultProps = {
    data                   : [],
    ItemSeparatorComponent : () => {
      return <View style={styles.baseLine} />;
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
    ItmeHeight             : 50,
    footerRefreshingText   : '数据加载中…',
    footerFailureText      : '点击重新加载',
    footerNoMoreDataText   : '已加载全部数据',
    footerEmptyDataText    : '暂时没有相关数据'
  };

  onHeaderRefresh = () => {
    //当前是否可以进行下拉刷新
    if (this.shouldStartHeaderRefreshing()) {
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
    }
  };

  onEndReached = () => {
    //是否满足上啦加载动画
    if (this.shouldStartFooterRefreshing()) {
      this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
    }
  };

  /***
   * 当前是否可以进行下拉刷新
   * @returns {boolean}
   *
   * 如果列表尾部正在执行上拉加载，就返回false
   * 如果列表头部已经在刷新中了，就返回false
   */
  shouldStartHeaderRefreshing = () => {
    if (
      this.props.refreshState == RefreshState.HeaderRefreshing ||
      this.props.refreshState == RefreshState.FooterRefreshing
    ) {
      return false;
    }

    return true;
  };

  /***
   * 当前是否可以进行上拉加载更多
   * @returns {boolean}
   *
   * 如果底部已经在刷新，返回false
   * 如果底部状态是没有更多数据了，返回false
   * 如果头部在刷新，则返回false
   * 如果列表数据为空，则返回false（初始状态下列表是空的，这时候肯定不需要上拉加载更多，而应该执行下拉刷新）
   */
  shouldStartFooterRefreshing = () => {
    let { refreshState, data } = this.props;
    if (data.length == 0) {
      return false;
    }

    return refreshState == RefreshState.Idle;
  };

  _renderItem = ({ item }) => {
    return this.props.renderItem(item);
  };

  render() {
    let { renderItem, ListEmptyComponent, ...rest } = this.props;
    return (
      <FlatList
        ref={this.props.listRef}
        onEndReached={this.onEndReached}
        onRefresh={this.onHeaderRefresh}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}
        renderItem={this._renderItem}
        {...rest}
      />
    );
  }

  renderFooter = () => {
    let footer = null;

    let {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,

      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent
    } = this.props;

    switch (this.props.refreshState) {
      case RefreshState.Idle:
        footer = <View style={styles.footerContainer} />;
        break;
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity
            onPress={() => {
              if (this.props.data.length == 0) {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
              } else {
                this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
              }
            }}
          >
            {footerFailureComponent ? (
              footerFailureComponent
            ) : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerFailureText}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity
            onPress={() => {
              this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
            }}
          >
            {footerEmptyDataComponent ? (
              footerEmptyDataComponent
            ) : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerEmptyDataText}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.FooterRefreshing: {
        footer = footerRefreshingComponent ? (
          footerRefreshingComponent
        ) : (
          <View style={styles.footerContainer}>
            <ActivityIndicator size='small' color='#888888' />
            <Text style={[ styles.footerText, { marginLeft: 7 } ]}>{footerRefreshingText}</Text>
          </View>
        );
        break;
      }
      case RefreshState.NoMoreData: {
        footer = footerNoMoreDataComponent ? (
          footerNoMoreDataComponent
        ) : (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
          </View>
        );
        break;
      }
    }

    return footer;
  };
}

const styles = StyleSheet.create({
  footerContainer : {
    flex           : 1,
    flexDirection  : 'row',
    justifyContent : 'center',
    alignItems     : 'center',
    padding        : 10,
    height         : 44
  },
  footerText      : {
    fontSize : 14,
    color    : '#555555'
  },
  baseLine        : {
    width           : width,
    height          : 1,
    backgroundColor : '#eeeeee'
  },
  noListView      : {
    width          : width,
    height         : height - 140,
    justifyContent : 'center',
    alignItems     : 'center'
  },
  NoListText      : {
    marginTop : 15,
    fontSize  : 18,
    color     : '#999999'
  },
  bottomfoot      : {
    flexDirection  : 'row',
    justifyContent : 'center',
    alignItems     : 'center',
    padding        : 10
  },
  footText        : {
    marginTop : 5,
    fontSize  : 12,
    color     : '#999999'
  },
  activeLoad      : {
    flexDirection  : 'row',
    justifyContent : 'center',
    alignItems     : 'center'
  },
  ml              : {
    marginLeft : 10
  }
});
