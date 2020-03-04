import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import HeaderIconButtonExample from '../common/Header';
import { Actions } from 'react-native-router-flux';

export default class TextInputScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderIconButtonExample title='textinput' />
        {itemList.map((item, index) => {
          return (
            <TouchableHighlight
              key={index}
              underlayColor={'#dcdcdc'}
              onPress={() => {
                this.itemSelected(index);
              }}
            >
              <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.detail}>{item.description}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  }

  itemSelected(index) {
    switch (index) {
      case 0:
        Actions.register();
        break;
      case 1:
        Actions.autonewlineinput();
        break;
      case 2:
        Actions.autoheightinput();
        break;
    }
  }
}

const itemList = [
  {
    title       : 'RegisterExample',
    description : 'Example shows how to use TextInput, handle return key on keyboard, simple validation on input text'
  },
  {
    title       : '自适应高度InputText',
    description : 'Example shows how to use 自适应高度'
  },
  {
    title       : '高度换行InputText',
    description : 'Example shows how to use 换行'
  }
];
const styles = StyleSheet.create({
  container     : {
    flex : 1
  },
  itemContainer : {
    padding           : 10,
    borderBottomWidth : 1,
    borderBottomColor : '#dcdcdc'
  },
  title         : {
    fontSize   : 16,
    fontWeight : 'bold',
    color      : '#000'
  },
  detail        : {
    fontSize  : 14,
    color     : '#666666',
    marginTop : 10
  }
});
