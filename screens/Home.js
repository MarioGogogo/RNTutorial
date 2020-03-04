import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            Actions.listview();
          }}
        >
          <Text> To ListView </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.flatlist();
          }}
        >
          <Text> To Flatlist </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.sectionlist();
          }}
        >
          <Text> To SectionList </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.pullrefresh();
          }}
        >
          <Text> To PullRefresh </Text>
        </TouchableOpacity>
      </View>
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
