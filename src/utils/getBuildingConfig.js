import React from 'react';
import {Dimensions, View, Text} from 'react-native';

import Colors from '../constants/Colors';

const Window = Dimensions.get('window');
const WIDTH = Window.width;
const HEIGHT = Window.height;

const scale = 3;
const duration = 300;

const J_0 = [
  <View
    key={0}
    style={{
      width: WIDTH * 0.06,
      height: WIDTH * 0.075,
      left: WIDTH * 0.069,
      top: HEIGHT * 0.083,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text
      style={{
        transform: [{rotate: '90deg'}],
        fontSize: WIDTH * 0.009,
      }}>
      PORTIERNIA
    </Text>
  </View>,
  <View
    key={1}
    style={{
      width: WIDTH * 0.355,
      height: WIDTH * 0.13,
      left: WIDTH * 0.13,
      top: HEIGHT * 0.1,
      borderWidth: 1,
      borderColor: 'red',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text
      style={{
        fontSize: WIDTH * 0.06,
      }}>
      J29
    </Text>
  </View>,
  <View
    key={2}
    style={{
      width: WIDTH * 0.362,
      height: WIDTH * 0.132,
      left: WIDTH * 0.121,
      top: HEIGHT * 0.212,
      borderWidth: 1,
      borderColor: 'red',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text
      style={{
        fontSize: WIDTH * 0.06,
      }}>
      J30
    </Text>
  </View>,
  <View
    key={3}
    style={{
      width: WIDTH * 0.362,
      height: WIDTH * 0.132,
      left: WIDTH * 0.121,
      top: HEIGHT * 0.294,
      borderWidth: 1,
      borderColor: 'red',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text
      style={{
        fontSize: WIDTH * 0.06,
      }}>
      J31
    </Text>
  </View>,
];

const configs = {
  a: {
    style: {
      width: WIDTH * 0.063,
      height: WIDTH * 0.259,
      left: WIDTH * 0.639,
      top: WIDTH * 0.494,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: -(WIDTH / 2) * 0.34,
      y: -(WIDTH / 2) * 0.3,
      scale,
      duration,
    },
    floors: [],
  },
  b: {
    style: {
      width: WIDTH * 0.053,
      height: WIDTH * 0.149,
      left: WIDTH * 0.512,
      top: WIDTH * 0.605,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: -(WIDTH / 2) * 0.076,
      y: -(WIDTH / 2) * 0.35,
      scale,
      duration,
    },
    floors: [
      {},
      {
        map: require('../assets/images/B_1.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.7},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
      },
      {
        map: require('../assets/images/B_2.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.8},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
      },
    ],
  },
  c: {
    style: {
      width: WIDTH * 0.0515,
      height: WIDTH * 0.149,
      left: WIDTH * 0.427,
      top: WIDTH * 0.605,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: (WIDTH / 2) * 0.09,
      y: -(WIDTH / 2) * 0.35,
      scale,
      duration,
    },
    floors: [
      {},
      {
        map: require('../assets/images/C_1.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.75},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
      },
      {
        map: require('../assets/images/C_2.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.8},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
      },
    ],
  },
  d: {
    style: {
      width: WIDTH * 0.0506,
      height: WIDTH * 0.149,
      left: WIDTH * 0.343,
      top: WIDTH * 0.605,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: (WIDTH / 2) * 0.26,
      y: -(WIDTH / 2) * 0.35,
      scale,
      duration,
    },
    floors: [
      {},
      {
        map: require('../assets/images/D_1.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.8},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
      },
      {
        map: require('../assets/images/D_2.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.8},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
      },
    ],
  },
  e: {
    style: {
      width: WIDTH * 0.222,
      height: WIDTH * 0.093,
      left: WIDTH * 0.343,
      top: WIDTH * 0.515,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: (WIDTH / 2) * 0.09,
      y: -(WIDTH / 2) * 0.12,
      scale,
      duration,
    },
    floors: [],
  },
  f: {
    style: {
      width: WIDTH * 0.113,
      height: WIDTH * 0.052,
      left: WIDTH * 0.081,
      top: WIDTH * 0.5033,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: (WIDTH / 2) * 0.72,
      y: -(WIDTH / 2) * 0.1,
      scale,
      duration,
    },
    floors: [],
  },
  g: {
    style: {
      width: WIDTH * 0.095,
      height: WIDTH * 0.185,
      left: WIDTH * 0.095,
      top: WIDTH * 0.225,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      borderWidth: 1,
      position: 'absolute',
    },
    zoom: {x: (WIDTH / 2) * 0.71, y: (WIDTH / 2) * 0.3, scale, duration},
    floors: [],
  },
  h: {
    style: {
      width: WIDTH * 0.181,
      height: WIDTH * 0.094,
      left: WIDTH * 0.2505,
      top: WIDTH * 0.221,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: (WIDTH / 2) * 0.32,
      y: (WIDTH / 2) * 0.45,
      scale,
      duration,
    },
    floors: [],
  },
  j: {
    style: {
      width: WIDTH * 0.052,
      height: WIDTH * 0.145,
      left: WIDTH * 0.2505,
      top: WIDTH * 0.3111,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: (WIDTH / 2) * 0.443,
      y: (WIDTH / 2) * 0.22,
      scale,
      duration,
    },
    floors: [
      {
        map: require('../assets/images/J_0.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.6},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
        rooms: J_0,
      },
      {
        map: require('../assets/images/J_1.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.6},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
      },
    ],
  },
  k: {
    style: {
      width: WIDTH * 0.0485,
      height: WIDTH * 0.145,
      left: WIDTH * 0.3395,
      top: WIDTH * 0.3111,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: (WIDTH / 2) * 0.27,
      y: (WIDTH / 2) * 0.22,
      scale,
      duration,
    },
    floors: [
      {
        map: require('../assets/images/K_0.png'),
        imageStyle: {width: WIDTH, height: HEIGHT * 0.7},
        imageZoomWidth: WIDTH,
        imageZoomHeight: HEIGHT,
      },
    ],
  },
  l: {
    style: {
      width: WIDTH * 0.09,
      height: WIDTH * 0.073,
      left: WIDTH * 0.866,
      top: WIDTH * 0.544,
      borderWidth: 1,
      borderColor: Colors.primaryDark,
      backgroundColor: Colors.primary,
      opacity: 0.3,
      position: 'absolute',
    },
    zoom: {
      x: -(WIDTH / 2) * 0.82,
      y: -(WIDTH / 2) * 0.2,
      scale,
      duration,
    },
    floors: [],
  },
};

export default configs;
