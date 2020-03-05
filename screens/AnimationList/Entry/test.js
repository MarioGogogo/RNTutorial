import React from 'react';
import { View, Animated, Text, TouchableOpacity, StyleSheet, Easing } from 'react-native';

export default class TimingAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animValue   : new Animated.Value(0), // 初始值设为0
      isExpand    : true,
      heightValue : new Animated.Value(0)
    };
  }

  render() {
    let buttonText = this.state.isExpand ? '放大' : '缩小';
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.box,
            {
              opacity   : this.state.animValue,
              transform : [ { scale: this.state.animValue } ]
            }
          ]}
        />
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => this.buttonClicked()}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            width           : 200,
            backgroundColor : 'red',
            height          : 30,
            transform       : [
              {
                translateY : this.state.heightValue
              }
            ]
          }}
        />

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => this.buttonSpread()}>
          <Text style={styles.buttonText}>点击按钮展开缩小</Text>
        </TouchableOpacity>
      </View>
    );
  }

  buttonSpread() {
    // 随时间变化而执行动画
    Animated.timing(
      this.state.heightValue, // 动画中的变量值
      {
        toValue  : 30.0, // 透明度最终变为1，即完全不透明
        duration : 1000, // 持续时间
        easing   : Easing.bounce //动画效果函数
      }
    ).start();
  }

  buttonClicked() {
    if (this.state.isExpand) {
      // 放大
      this.setState(
        {
          isExpand : false
        },
        () => {
          this.enlargeAnimation();
        }
      );
    } else {
      // 缩小
      this.setState(
        {
          isExpand : true
        },
        () => {
          this.shrinkAnimation();
        }
      );
    }
  }

  enlargeAnimation() {
    // 随时间变化而执行动画
    Animated.timing(
      this.state.animValue, // 动画中的变量值
      {
        toValue  : 1.0, // 透明度最终变为1，即完全不透明
        duration : 1000, // 持续时间
        easing   : Easing.bounce //动画效果函数
      }
    ).start();
  }

  shrinkAnimation() {
    Animated.timing(this.state.animValue, {
      toValue  : 0.2,
      duration : 1000
    }).start();
  }
}

const styles = StyleSheet.create({
  container  : {
    flex : 1
  },
  box        : {
    backgroundColor : '#f54665',
    width           : 200,
    height          : 200
  },
  button     : {
    width           : 150,
    height          : 50,
    borderRadius    : 6,
    backgroundColor : '#41a2ff',
    alignItems      : 'center',
    justifyContent  : 'center',
    marginTop       : 10
  },
  buttonText : {
    fontSize   : 16,
    fontWeight : 'bold',
    color      : 'white'
  }
});
