import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity
} from 'react-native';

import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  // 动画初始化
  const state = {
    finished  : new Value(0),
    position  : new Value(0),
    time      : new Value(0),
    frameTime : new Value(0)
  };
  // 配置
  const config = {
    duration : 1000,
    toValue  : new Value(0),
    easing   : Easing.inOut(Easing.ease)
  };

  // 执行动画;
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
class MusicApp extends Component {
  constructor() {
    super();

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent : ({ state }) =>
          block([ cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0))) ])
      }
    ]);

    //关闭状态
    this.onCloseState = event([
      {
        nativeEvent : ({ state }) =>
          block([ cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1))) ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange  : [ 0, 1 ],
      outputRange : [ 100, 0 ],
      extrapolate : Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange  : [ 0, 1 ],
      outputRange : [ -height / 3 - 50, 0 ],
      extrapolate : Extrapolate.CLAMP
    });
    //过渡之后的按钮变化
    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange  : [ 0, 1 ],
      outputRange : [ 1, -1 ],
      extrapolate : Extrapolate.CLAMP
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange  : [ 0, 1 ],
      outputRange : [ 0, 100 ],
      extrapolate : Extrapolate.CLAMP
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange  : [ 0, 1 ],
      outputRange : [ 1, 0 ],
      extrapolate : Extrapolate.CLAMP
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange  : [ 0, 1 ],
      outputRange : [ 180, 360 ],
      extrapolate : Extrapolate.CLAMP
    });
  }

  //解决键盘弹起之后  关闭无法键盘收起的问题
  closeKeyDown = () => {
    //判断如果键盘弹起
    Keyboard.dismiss();
  };

  render() {
    return (
      <View
        style={{
          flex            : 1,
          backgroundColor : 'white',
          justifyContent  : 'flex-end'
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform : [ { translateY: this.bgY } ]
          }}
        >
          <Svg width={width} height={height + 50}>
            <ClipPath id='clip'>
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require('./assets/bg.jpg')}
              height={height + 50}
              width={width}
              preserveAspectRatio='xMidYMid slice'
              clipPath='url(#clip)' //这个非常重要一步
            />
          </Svg>
        </Animated.View>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
          <View style={{ height: height / 3, justifyContent: 'center' }}>
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                style={{
                  ...styles.button,
                  opacity   : this.buttonOpacity,
                  transform : [ { translateY: this.buttonY } ]
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
              </Animated.View>
            </TapGestureHandler>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor : '#2E71DC',
                opacity         : this.buttonOpacity,
                transform       : [ { translateY: this.buttonY } ]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SIGN IN WITH FACEBOOK</Text>
            </Animated.View>
            {/* 过渡之后的显示状态 */}

            <Animated.View
              style={{
                zIndex         : this.textInputZindex,
                opacity        : this.textInputOpacity,
                transform      : [ { translateY: this.textInputY } ],
                ...StyleSheet.absoluteFill,
                height         : height / 3,
                top            : null,
                justifyContent : 'center'
              }}
            >
              <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                <Animated.View style={{ ...styles.closeButton }}>
                  <TouchableOpacity onPress={this.closeKeyDown}>
                    <Animated.Text style={{ fontSize: 15, transform: [ { rotate: concat(this.rotateCross, 'deg') } ] }}>
                      X
                    </Animated.Text>
                  </TouchableOpacity>
                </Animated.View>
              </TapGestureHandler>

              <TextInput style={styles.textInput} placeholder={'Email'} placeholderTextColor={'block'} />
              <TextInput style={styles.textInput} placeholder={'PassWord'} placeholderTextColor={'block'} />
              <Animated.View
                style={{
                  ...styles.button
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
              </Animated.View>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
export default MusicApp;

const styles = StyleSheet.create({
  container   : {
    flex           : 1,
    alignItems     : 'center',
    justifyContent : 'center'
  },
  button      : {
    backgroundColor  : 'white',
    height           : 70,
    marginHorizontal : 20,
    borderRadius     : 35,
    alignItems       : 'center',
    justifyContent   : 'center',
    marginVertical   : 5,
    shadowOffset     : { width: 2, height: 2 },
    shadowColor      : 'black',
    shadowOpacity    : 0.2
  },
  textInput   : {
    height           : 50,
    borderRadius     : 25,
    borderWidth      : 0.5,
    marginHorizontal : 20,
    paddingLeft      : 20,
    marginVertical   : 5,
    borderColor      : 'rgba(0, 0, 0, 0.2)',
    backgroundColor  : '#fff',
    fontWeight       : 'bold'
  },
  closeButton : {
    height          : 40,
    width           : 40,
    backgroundColor : 'white',
    borderRadius    : 20,
    alignItems      : 'center',
    justifyContent  : 'center',
    position        : 'absolute',
    top             : -20,
    left            : width / 2 - 20,
    shadowOffset    : { width: 2, height: 2 },
    shadowColor     : 'black',
    shadowOpacity   : 0.2
  }
});
