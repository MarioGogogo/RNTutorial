import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
let { width, height } = Dimensions.get('window');
import MultilineTextInput from './MultilineTextInput';
import HeaderIconButtonExample from '../common/Header';
export default class AutoNewLineInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : ''
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderIconButtonExample />
        <MultilineTextInput
          style={{
            paddingTop        : 10,
            paddingLeft       : 26,
            backgroundColor   : '#fff',
            fontSize          : 18,
            height            : 90,
            width             : width,
            textAlignVertical : 'top',
            color             : '#999999'
          }}
          ref={'messageRef'}
          editable={true}
          placeholderTextColor={'#999999'}
          underlineColorAndroid='transparent'
          changeText={(text) => {
            this.setState({
              message : text
            });
          }}
          maxLength={100}
          // numberOfLines={8}
        />
      </View>
    );
  }
}
