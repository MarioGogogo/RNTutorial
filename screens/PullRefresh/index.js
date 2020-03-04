import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RefreshListView from './RefreshListView';
import { queryMovies } from '../common/Serice';
import MovieItemCell from './MovieItemCell';
import RefreshState from './RefreshState';
import HeaderIconButtonExample from '../common/Header';
export default class MovieListPullRefresh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList : [], // 电影列表的数据源
      startPage : 0, // 从第几页开始加载
      pageSize  : 10 // 每页加载多少条数据
    };
  }

  componentDidMount() {
    this.listView.beginHeaderRefresh();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderIconButtonExample title='PullRefresh' />
        <RefreshListView
          ref={(ref) => {
            this.listView = ref;
          }}
          data={this.state.movieList}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={this._renderEmptyView}
          onHeaderRefresh={() => {
            this.loadDisplayingMovies();
          }}
          onFooterRefresh={() => {
            console.log('触发加载更多');
            this.loadDisplayingMovies(true);
          }}
        />
      </View>
    );
  }

  _renderItem = (item) => {
    return (
      <MovieItemCell
        movie={item.item}
        onPress={() => {
          console.log('点击了电影----' + item.item.title);
        }}
      />
    );
  };

  /// 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
  _renderEmptyView = (item) => {
    return (
      <View
        style={{ marginTop: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
      >
        <Text>空白列表</Text>
      </View>
    );
  };

  /**
   * 加载正在上映的电影列表，此处默认城市为北京，取20条数据显示
   */
  loadDisplayingMovies(next) {
    let that = this;
    const startPage = next ? this.state.startPage + 1 : this.state.startPage;
    fetch(queryMovies('北京', startPage, this.state.pageSize))
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        let movies = [];
        for (let idx in json.subjects) {
          let movieItem = json.subjects[idx];
          let directors = ''; // 导演
          for (let index in movieItem.directors) {
            // 得到每一条电影的数据
            let director = movieItem.directors[index];
            // 将多个导演的名字用空格分隔开显示
            if (directors === '') {
              directors = directors + director.name;
            } else {
              directors = directors + ' ' + director.name;
            }
          }
          movieItem['directorNames'] = directors;

          // 拼装主演的演员名字，多个名字用空格分隔显示
          let actors = '';
          for (let index in movieItem.casts) {
            let actor = movieItem.casts[index];
            if (actors === '') {
              actors = actors + actor.name;
            } else {
              actors = actors + ' ' + actor.name;
            }
          }
          movieItem['actorNames'] = actors;
          movies.push(movieItem);
        }
        // 获取总的条数
        let totalCount = json.total;

        // 当前已经加载的条数
        let currentCount = this.state.movieList.length;

        // 根据已经加载的条数和总条数的比较，判断是否还有下一页
        let footerState = RefreshState.Idle;
        let startPage = this.state.startPage;
        if (currentCount + movies.length < totalCount) {
          // 还有数据可以加载
          footerState = RefreshState.CanLoadMore;
          // 下次加载从第几条数据开始
          startPage = startPage + movies.length;
        } else {
          footerState = RefreshState.NoMoreData;
        }
        // 更新movieList的值
        let movieList = this.state.movieList.concat(movies);
        that.setState({
          movieList : movieList,
          startPage : startPage
        });
        that.listView.endRefreshing(footerState);
      })
      .catch((e) => {
        console.log('加载失败');
        that.listView.endRefreshing(RefreshState.Failure);
      })
      .done();
  }
}
