import React from 'react';
import {Dimensions} from 'react-native';

const Window = Dimensions.get('window');
const WIDTH = Window.width;
const HEIGHT = Window.height;

const mapsConfig = {
  a: [],
  b: [],
  c: [],
  d: [],
  g: [],
  j: [
    {
      map: require('../assets/images/J_0.png'),
      style: {width: WIDTH, height: WIDTH * 1.2},
      imageZoomWidth: WIDTH,
      imageZoomHeight: WIDTH * 1.2,
    },
    {
      map: require('../assets/images/J_1.png'),
      style: {width: WIDTH, height: WIDTH * 1.2},
      imageZoomWidth: WIDTH,
      imageZoomHeight: WIDTH * 1.2,
    },
  ],
  k: [],
};

export default mapsConfig;
