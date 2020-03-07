import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import Item from './item';
import HeaderIconButtonExample from '../../common/Header';

export default class TimingAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        { index: 1, text: 1 },
        { index: 2, text: 2 },
        { index: 3, text: 3 },
        { index: 4, text: 4 },
        { index: 5, text: 5 },
        { index: 6, text: 6 }
      ]
    };
  }
  _renderItem = (item) => {
    return <Item data={item} />;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderIconButtonExample />

        <FlatList
          numColumns={2}
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.index.toString()}
        />
      </View>
    );
  }
}
