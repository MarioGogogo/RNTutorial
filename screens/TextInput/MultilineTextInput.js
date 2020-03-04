'use strict';
import React, { Component, PropTypes } from 'react';

import {
  TextInput, //输入框
  Dimensions,
  Platform
} from 'react-native';

//屏幕宽度,高度 screen（scale为分辨率）
let { width, height } = Dimensions.get('window');

let feedBackText = '';

export default class FixedTextInput extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      feedBackText : '',
      selection    : { start: 0, end: 0 }
    };
    this.onChange = this._onChange.bind(this);
  }

  _latestSubmitEditing = null;

  _fixedOnSubmitEditing = (e) => {
    // 实现只响应第一次 onSubmitEditing 事件
    const latestSubmitEditing = this._latestSubmitEditing;
    this._latestSubmitEditing = e.timeStamp;
    if (latestSubmitEditing && e.timeStamp - latestSubmitEditing < 200) return;
    let value = this.state.feedBackText;
    let length = this.state.feedBackText.length;
    let { start, end } = this.state.selection;
    if (end >= 0 && length >= end) {
      let valueBefore = value.substring(0, end);
      let valueAfter = value.substring(end, length);

      this.setState({
        feedBackText : valueBefore + '\n' + valueAfter
      });
      if (end != length) {
        const newSelection = {
          start : start + 1,
          end   : end + 1
        };
        console.log('newSelection ' + newSelection);
        //重新定位光标位置
        this.setState({
          selection : newSelection
        });
      }
    }
  };

  _onChange(text) {
    let val = text;
    this.setState({
      feedBackText : val
    });
    this.props.changeText(val);
  }

  _isNull(str) {
    if (str === '' || str === undefined) return true;
    let regu = '^[ ]+$';
    let re = new RegExp(regu);
    return re.test(str);
  }

  //selection={selection} 设置光标位置
  //onSelectionChange 保存当前光标位置
  //onSubmitEditing 点击回车按钮的回调函数
  render() {
    let { feedBackText, selection } = this.state;

    let { value } = this.props;
    return (
      <TextInput
        selection={selection}
        onSelectionChange={this._onSelectionChange}
        onChangeText={this.onChange}
        value={value ? value : feedBackText}
        {...this.props}
        multiline={true}
        onSubmitEditing={this._fixedOnSubmitEditing}
        blurOnSubmit={false}
      />
    );
  }

  _onSelectionChange = (event) => {
    this.setState({ selection: event.nativeEvent.selection });
  };
}
