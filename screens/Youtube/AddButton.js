import React from 'react';
import { View, StyleSheet, TouchableHighlight, Animated } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.buttonSize = new Animated.Value(1);
    this.mode = new Animated.Value(0);
  }
  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue  : 0.95,
        duration : 400
      }),
      Animated.timing(this.buttonSize, {
        toValue : 1
      }),
      Animated.timing(this.mode, {
        toValue : this.mode._value === 0 ? 1 : 0
      })
    ]).start();
  };
  render() {
    const sizeStyle = {
      transform : [ { scale: this.buttonSize } ]
    };
    const roateion = this.mode.interpolate({
      inputRange  : [ 0, 1 ],
      outputRange : [ '0deg', '45deg' ]
    });
    const thermometerX = this.mode.interpolate({
      inputRange  : [ 0, 1 ],
      outputRange : [ 10, -60 ]
    });

    const thermometerY = this.mode.interpolate({
      inputRange  : [ 0, 1 ],
      outputRange : [ 0, -50 ]
    });
    const timeX = this.mode.interpolate({
      inputRange  : [ 0, 1 ],
      outputRange : [ 10, 20 ]
    });

    const timeY = this.mode.interpolate({
      inputRange  : [ 0, 1 ],
      outputRange : [ 0, -120 ]
    });

    const pulseX = this.mode.interpolate({
      inputRange  : [ 0, 1 ],
      outputRange : [ 10, 90 ]
    });

    const pulseY = this.mode.interpolate({
      inputRange  : [ 0, 1 ],
      outputRange : [ 0, -50 ]
    });
    return (
      <View style={styles.container}>
        <Animated.View style={{ position: 'absolute', left: thermometerX, top: thermometerY }}>
          <View style={styles.secondaryButton}>
            <FontAwesomeIcon name='thermometer' size={24} color='#FFF' />
          </View>
        </Animated.View>
        <Animated.View style={{ position: 'absolute', left: timeX, top: timeY }}>
          <View style={styles.secondaryButton}>
            <FontAwesomeIcon name='clock' size={24} color='#FFF' />
          </View>
        </Animated.View>
        <Animated.View style={{ position: 'absolute', left: pulseX, top: pulseY }}>
          <View style={styles.secondaryButton}>
            <FontAwesomeIcon name='user-tie' size={24} color='#FFF' />
          </View>
        </Animated.View>
        <Animated.View style={{ ...styles.button, ...sizeStyle }}>
          <TouchableHighlight
            onPress={this.handlePress}
            style={{
              height         : 72,
              width          : 72,
              borderRadius   : 36,
              justifyContent : 'center',
              alignItems     : 'center'
            }}
            underlayColor='#7f58ff'
          >
            <Animated.View style={{ transform: [ { rotate: roateion } ] }}>
              <FontAwesomeIcon name={'plus'} size={24} color={'#fff'} />
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container       : {
    top        : 300,
    left       : 200,
    alignItems : 'center',
    position   : 'absolute'
  },
  button          : {
    backgroundColor : '#7f58ff',
    justifyContent  : 'center',
    alignItems      : 'center',
    width           : 72,
    height          : 72,
    borderRadius    : 36,
    shadowColor     : '#7f58ff',
    shadowRadius    : 5,
    shadowOffset    : { height: 5 },
    shadowOpacity   : 0.3,
    borderWidth     : 3,
    borderColor     : '#fff'
  },
  secondaryButton : {
    position        : 'absolute',
    alignItems      : 'center',
    justifyContent  : 'center',
    width           : 48,
    height          : 48,
    borderRadius    : 24,
    backgroundColor : '#7F58FF'
  }
});
