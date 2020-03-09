import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Footer,
  FooterTab,
  Button,
  Badge,
  View
} from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class SwitchTabView extends Component {
  render() {
    const { index } = this.props;
    let Screen = null;
    switch (index) {
      case 0:
        Screen = (
          <Content>
            <List>
              <ListItem onPress={() => Actions.listview()}>
                <Left>
                  <Text>To ListView</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem onPress={() => Actions.flatlist()}>
                <Left>
                  <Text>To Flatlist</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem onPress={() => Actions.sectionlist()}>
                <Left>
                  <Text>To SectionList</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem onPress={() => Actions.swipelist()}>
                <Left>
                  <Text>To SwpieList</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem onPress={() => Actions.pullrefresh()}>
                <Left>
                  <Text> To PullRefresh</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem onPress={() => Actions.pullrefresh2()}>
                <Left>
                  <Text> To PullRefresh2</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem onPress={() => Actions.textinput()}>
                <Left>
                  <Text> To TextInput</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem onPress={() => Actions.animationlist()}>
                <Left>
                  <Text> To Animation</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
            </List>
          </Content>
        );
        break;
      case 1:
        Screen = (
          <Content>
            <Text>第二页</Text>
          </Content>
        );
        break;
      case 2:
        Screen = (
          <Content>
            <List>
              <ListItem onPress={() => Actions.musicapp()}>
                <Left>
                  <Text>To Youtube_Login</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              <ListItem onPress={() => Actions.addbutton()}>
                <Left>
                  <Text>To Youtube_AddButton</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
            </List>
          </Content>
        );
        break;
      case 3:
        Screen = (
          <Content>
            <Text>第四页</Text>
          </Content>
        );
      default:
        break;
    }
    return Screen;
  }
}
