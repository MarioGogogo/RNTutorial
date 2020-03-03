import React, { Component } from 'react';
import { View, ListView, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HeaderIconButtonExample from '../common/Header';
const items = [
  {
    title  : 'Simple List',
    detail : '单行列表，无分组'
  },
  {
    title  : 'Grid Layout',
    detail : '网格列表'
  },
  {
    title  : 'Section List 1',
    detail : '分组列表，嵌套View实现网格'
  },
  {
    title  : 'Section List 2',
    detail : '分组列表，嵌套ListView实现网格'
  }
];

export default class index extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged : (r1, r2) => r1 !== r2
    });
    console.log('ds', ds);

    this.state = {
      dataSource : ds.cloneWithRows(items)
    };
  }

  _renderRow = (rowData, sectionId, rowId) => {
    let rowIndex = Number(rowId);
    return (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={() => {
          this.itemPressed(rowIndex);
        }}
      >
        <Text style={styles.titleLabel}>{rowData.title}</Text>
        <Text style={styles.detailLabel}>{rowData.detail}</Text>
      </TouchableOpacity>
    );
  };

  itemPressed(index: Number) {
    switch (index) {
      case 0:
        Actions.simplelistscreen();
        // this.props.navigator.push({
        //   component         : SimpleListScreen,
        //   title             : 'Simple List',
        //   leftButtonTitle   : 'Back',
        //   onLeftButtonPress : () => {
        //     this.props.navigator.pop();
        //   }
        // });
        break;
      case 1:
        Actions.grouplistscreen();
        break;
      case 2:
        Actions.sectionlistscreen();
        break;
      case 3:
        Actions.gridlayoutscreen();
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderIconButtonExample />
        <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container     : {
    flex : 1
  },
  cellContainer : {
    padding           : 10,
    borderBottomWidth : 1,
    borderColor       : '#dcdcdc'
  },
  titleLabel    : {
    fontSize   : 18,
    fontWeight : 'bold'
  },
  detailLabel   : {
    fontSize  : 13,
    color     : '#999999',
    marginTop : 10
  }
});
