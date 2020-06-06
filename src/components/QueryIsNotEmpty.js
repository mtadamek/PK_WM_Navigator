import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class QueryIsNotEmpty extends Component {
  componentDidMount() {
    console.log('QueryIsNotEmpty');
  }
  render() {
    return (
      <View>
        <Text> QueryIsNotEmpty </Text>
      </View>
    );
  }
}