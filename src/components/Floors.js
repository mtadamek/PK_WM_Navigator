import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';

import Colors from '../constants/Colors';

const Window = Dimensions.get('window');
const WIDTH = Window.width;
const HEIGHT = Window.height;

export default class Floors extends Component {
  state = {active: false};

  render() {
    const floorsCount = this.props.floorsCount ? this.props.floorsCount : 0;

    let floorBtns = [];
    for (let index = 0; index < floorsCount; index++) {
      floorBtns.push(
        <TouchableOpacity
          key={`floor${index}`}
          style={{
            flex: 1,
            margin: 5,
            backgroundColor: Colors.primary,
            borderRadius: WIDTH * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            this.setState({active: false});
            this.props.onFloorPress(index);
          }}>
          <Text style={{color: 'white'}}>{index}</Text>
        </TouchableOpacity>,
      );
    }

    return (
      <View
        style={{
          position: 'absolute',
          width: WIDTH * 0.15,
          height: WIDTH * 0.15 * (floorsCount + 1),
          bottom: WIDTH * 0.05,
          right: WIDTH * 0.05,
        }}>
        <View
          style={{
            flex: floorsCount,
            display: 'flex',
            flexDirection: 'column-reverse',
          }}>
          {this.state.active && floorBtns}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              margin: 0,
              backgroundColor: Colors.primary,
              borderRadius: WIDTH * 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.setState({active: !this.state.active})}>
            <Image
              style={{height: '50%', width: '70%'}}
              source={require('../assets/images/floors.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
