import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  Easing
} from 'react-native';
import HeaderIconButtonExample from '../../common/Header';
// import moduleName from 'module'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class SpreadList extends Component {
  constructor(props) {
    super(props);
    // 记录点击
    this.state = {
      isSelect  : -1,
      animValue : new Animated.Value(0)
    };
  }

  // header点击
  itemTap = (index) => {
    // 点击的item如果是同一个, 就置为初始状态-1, 也就是折叠的状态
    let select = index;
    if (this.state.isSelect === index) {
      select = -1;
    }

    // 就这一句话就有动画效果了, 神奇不... , 对LayoutAnimation不熟悉的可以看上一篇文章.
    LayoutAnimation.easeInEaseOut();
    Animated.timing(this.state.animValue, {
      toValue  : 1,
      duration : 500
      // easing   : Easing.linear
    }).start();
    this.setState({
      isSelect : select
    });
  };

  // 渲染FlatList的item
  renderItem = (item) => {
    const { id, title, children } = item.item;
    const text = '第' + id + '个   ' + title;
    const itemColor = '#dcdcdc';
    console.log(this.state.isSelect, item.index);

    return (
      <View>
        {/*每组的点击header*/}
        <TouchableOpacity
          style={[ styles.listItemTouch, { backgroundColor: itemColor } ]}
          activeOpacity={0.6}
          onPress={() => {
            this.itemTap(id);
          }}
        >
          <Text style={styles.listItemText}>{text}</Text>
          <Animated.View
            style={[
              {
                transform : [
                  {
                    rotate : this.state.animValue.interpolate(
                      this.state.isSelect === id
                        ? {
                            inputRange  : [ 0, 1 ],
                            outputRange : [ '0deg', '90deg' ]
                          }
                        : {
                            inputRange  : [ 0, 1 ],
                            outputRange : [ '0deg', '0deg' ]
                          }
                    )
                  }
                ]
              }
            ]}
          >
            <Icon name={'angle-right'} size={28} color={'#fff'} />
          </Animated.View>
        </TouchableOpacity>

        {/*每组的折叠item, 相等显示, 不等隐藏*/}
        {this.state.isSelect === id ? (
          <View style={styles.listSubBg}>
            {children.map((subItem, subItemIndex) => {
              return (
                <TouchableOpacity key={subItem.id} style={styles.listSubItemTouch}>
                  <Text>{subItem.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.bgView}>
        <HeaderIconButtonExample />
        <FlatList
          style={styles.flatList}
          ref={(flatList) => (this.flatList = flatList)}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          extraData={this.state}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const windowW = Dimensions.get('window').width;

const styles = StyleSheet.create({
  bgView           : {
    flex : 1
  },
  flatList         : {
    flex : 1
  },
  listItemTouch    : {
    flex              : 1,
    flexDirection     : 'row',
    height            : 50,
    width             : windowW,
    justifyContent    : 'space-between',
    alignItems        : 'center',
    paddingHorizontal : 10
  },
  listItemText     : {
    textAlign : 'center',
    fontSize  : 20
  },
  listSubBg        : {
    width : windowW
  },
  listSubItemTouch : {
    marginTop       : 2,
    height          : 40,
    width           : windowW,
    backgroundColor : '#ccc'
  }
});

const data = [
  {
    id       : 1,
    title    : '父级任务1',
    children : [
      {
        id    : 11,
        title : '子级任务1'
      },
      {
        id    : 12,
        title : '子级任务2'
      }
    ]
  },
  {
    id       : 2,
    title    : '父级任务2',
    children : [
      {
        id    : 21,
        title : '子级任务2'
      },
      {
        id    : 22,
        title : '子级任务3'
      }
    ]
  },
  {
    id       : 3,
    title    : '父级任务3',
    children : [
      {
        id    : 31,
        title : '子级任务1'
      },
      {
        id    : 32,
        title : '子级任务2'
      }
    ]
  },
  {
    id       : 4,
    title    : '父级任务4',
    children : []
  },
  {
    id       : 5,
    title    : '父级任务5',
    children : [
      {
        id    : 51,
        title : '子级任务5'
      },
      {
        id    : 52,
        title : '子级任务5'
      }
    ]
  },
  {
    id       : 6,
    title    : '父级任务6',
    children : [
      {
        id    : 61,
        title : '子级任务1'
      }
    ]
  }
];
