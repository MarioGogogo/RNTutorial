import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput } from 'react-native';
let { width, height } = Dimensions.get('window');
import HeaderIconButtonExample from '../common/Header';
export default class AutoHeightInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputHeight : 40
    };
    this.remark =
      'TextInput是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。最简单的用法就是丢一个TextInput到应用里，然后订阅它的onChangeText事件来读取用户的输入。注意，从TextInput里取值这就是目前唯一的做法！也就是使用在onChangeText中用setState把用户的输入写入到state中，然后在需要取值的地方从this.state中取出值。它还有一些其它的事件，譬如onSubmitEditing和onFocus。一个简单的例子如下,TextInput是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。最简单的用法就是丢一个TextInput到应用里，然后订阅它的onChangeText事件来读取用户的输入。注意，从TextInput里取值这就是目前唯一的做法！也就是使用在onChangeText中用setState把用户的输入写入到state中，然后在需要取值的地方从this.state中取出值。它还有一些其它的事件，譬如onSubmitEditing和onFocus。一个简单的例子如下';
  }
  //实现高度自增长的 TextInput 组件
  onChangeHeight = (event) => {
    var height = 0;
    if (event.nativeEvent.contentSize.height > 40) {
      //此处是判断 是否大于我设置的input默认高度，如果大于则使用input的内容高度
      height = event.nativeEvent.contentSize.height; //内容高度
    } else {
      height = this.state.textInputHeight;
    }
    this.setState({
      textInputHeight : height + 20
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderIconButtonExample />
        <TextInput
          ref='comment'
          editable={true}
          style={[
            {
              backgroundColor   : '#dcdcdc',
              lineHeight        : 25,
              paddingHorizontal : 10,
              height            : this.state.textInputHeight,
              marginBottom      : 10
            }
          ]}
          multiline={true}
          underlineColorAndroid={'transparent'}
          onContentSizeChange={this.onChangeHeight}
          value={this.remark}
        />
      </View>
    );
  }
}
