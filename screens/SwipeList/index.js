import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import HeaderIconButtonExample from '../common/Header';

const datas = Array(6).fill('').map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

console.log(datas);

export default class SwipeListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData    : datas,
      setListData : []
    };
  }

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  deleteRow = (rowMap, rowKey) => {
    console.log(rowMap, rowKey);

    this.closeRow(rowMap, rowKey);
    const newData = [ ...this.state.listData ];
    const prevIndex = this.state.listData.findIndex((item) => item.key === rowKey);
    console.log(prevIndex);
    newData.splice(prevIndex, 1);
    this.setState({
      listData : newData
    });
  };

  onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  renderItem = (data) => (
    <TouchableHighlight onPress={() => console.log('You touched me')} style={styles.rowFront} underlayColor={'#AAA'}>
      <View>
        <Text>I am {data.item.text} in a SwipeListView</Text>
      </View>
    </TouchableHighlight>
  );

  renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[ styles.backRightBtn, styles.backRightBtnLeft ]}
        onPress={() => {
          this.closeRow(rowMap, data.item.key);
        }}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[ styles.backRightBtn, styles.backRightBtnRight ]}
        onPress={() => {
          this.deleteRow(rowMap, data.item.key);
        }}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <HeaderIconButtonExample />
        <SwipeListView
          data={this.state.listData}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={this.onRowDidOpen}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container         : {
    backgroundColor : 'white',
    flex            : 1
  },
  backTextWhite     : {
    color : '#FFF'
  },
  rowFront          : {
    alignItems        : 'center',
    backgroundColor   : '#CCC',
    borderBottomColor : 'black',
    borderBottomWidth : 1,
    justifyContent    : 'center',
    height            : 50
  },
  rowBack           : {
    alignItems      : 'center',
    backgroundColor : '#DDD',
    flex            : 1,
    flexDirection   : 'row',
    justifyContent  : 'space-between',
    paddingLeft     : 15
  },
  backRightBtn      : {
    alignItems     : 'center',
    bottom         : 0,
    justifyContent : 'center',
    position       : 'absolute',
    top            : 0,
    width          : 75
  },
  backRightBtnLeft  : {
    backgroundColor : 'blue',
    right           : 75
  },
  backRightBtnRight : {
    backgroundColor : 'red',
    right           : 0
  }
});
