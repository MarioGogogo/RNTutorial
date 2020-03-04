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
  Badge
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import SwitchTabView from './SwitchTabView';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currIndex : 0,
      footTabs  : [
        { badge: 2, title: 'Apps', IconName: 'apps', active: true },
        { badge: 0, title: 'Camera', IconName: 'camera', active: false },
        { badge: 51, title: 'Navigate', IconName: 'navigate', active: false },
        { badge: 0, title: 'Contact', IconName: 'person', active: false }
      ]
    };
  }
  _selectTab = (idx) => {
    if (this.state.footTabs[idx].active) return;
    const newFootTabs = this.state.footTabs.map((item, index) => ({
      badge    : item.badge,
      title    : item.title,
      IconName : item.IconName,
      active   : index === idx ? true : false
    }));
    this.setState({
      currIndex : idx,
      footTabs  : newFootTabs
    });
  };
  render() {
    console.log(this.state.footTabs);

    return (
      <Container>
        <Header />
        {/* 列表 */}
        <SwitchTabView index={this.state.currIndex} />
        <Footer>
          <FooterTab>
            {this.state.footTabs.map((item, index) => (
              <Button
                badge={item.badge ? true : false}
                active={item.active}
                vertical
                key={item.title.toString()}
                onPress={() => this._selectTab(index)}
              >
                {item.badge ? (
                  <Badge>
                    <Text>{item.badge}</Text>
                  </Badge>
                ) : null}
                <Icon name={item.IconName} />
                <Text>{item.title}</Text>
              </Button>
            ))}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
