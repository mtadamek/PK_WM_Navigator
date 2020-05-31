import React, {Component} from 'react';
import {
  View,
  Alert,
  BackHandler,
  DeviceEventEmitter,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-ionicons';

export default class SearchBar extends Component {
  render() {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: 'blue',
          justifyContent: 'center',
          paddingHorizontal: 5,
          left: 0,
          top: 0,
          position: 'absolute',
        }}>
        <View
          style={{
            height: 50,
            backgroundColor: 'white',
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
          }}>
          <Icon name="search" />
          <TextInput placeholder="Szukaj" />
        </View>
      </View>
    );
  }
}
