import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class HeaderIconButtonExample extends Component {
  render() {
    const { title, rightTitle } = this.props;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>{title ? title : 'Header'}</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.props.cancel}>
            <Text>{rightTitle ? rightTitle : 'Cancel'}</Text>
          </Button>
        </Right>
      </Header>
    );
  }
}
