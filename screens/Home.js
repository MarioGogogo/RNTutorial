import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header />
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
            <ListItem onPress={() => Actions.pullrefresh()}>
              <Left>
                <Text> To PullRefresh</Text>
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
          </List>
        </Content>
      </Container>
    );
  }
}
