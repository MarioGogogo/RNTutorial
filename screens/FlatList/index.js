import React, { Component } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { queryMovies, comingMovies } from '../common/Serice';
import MovieItemCell from './MovieItemCell';
import HeaderIconButtonExample from '../common/Header';
export default class MovieListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList : [], // 电影列表的数据源
      loaded    : false // 用来控制loading视图的显示，当数据加载完成，loading视图不再显示
    };
  }

  componentDidMount() {
    // this.loadComingMovies();
    this.loadDisplayingMovies();
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator animating={true} size='small' />
          <Text style={{ color: '#666666', paddingLeft: 10 }}>努力加载中</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <HeaderIconButtonExample />
        <FlatList data={this.state.movieList} renderItem={this._renderItem} keyExtractor={(item) => item.id} />
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

  /**
   * 加载正在上映的电影列表，此处默认城市为北京，取20条数据显示
   */
  loadDisplayingMovies() {
    let that = this;
    fetch(queryMovies('北京', 0, 20))
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
        that.setState({
          movieList : movies,
          loaded    : true
        });
      })
      .catch((e) => {
        console.log('加载失败');
        that.setState({
          loaded : true
        });
      })
      .done();
  }

  /**
   * 加载即将上映的电影列表，此处默认城市为北京，取20条数据显示
   */
  loadComingMovies() {
    let that = this;
    fetch(comingMovies('北京', 0, 20))
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json == null) {
          that.setState({
            loaded : true
          });
          return;
        }
        let movies = [];
        for (let idx in json.subjects) {
          let movieItem = json.subjects[idx];
          let directors = '';
          for (let index in movieItem.directors) {
            let director = movieItem.directors[index];
            if (directors === '') {
              directors = directors + director.name;
            } else {
              directors = directors + ' ' + director.name;
            }
          }
          movieItem['directorNames'] = directors;

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
        that.setState({
          movieList : movies,
          loaded    : true
        });
      })
      .catch((error) => {
        console.log('加载失败');
        that.setState({
          loaded : true
        });
      })
      .done();
  }
}

const styles = StyleSheet.create({
  loadingView : {
    flex           : 1,
    flexDirection  : 'row',
    justifyContent : 'center',
    alignItems     : 'center',
    padding        : 10
  }
});
