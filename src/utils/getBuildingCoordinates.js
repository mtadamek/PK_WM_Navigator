import {Dimensions} from 'react-native';
const Window = Dimensions.get('window');
const WIDTH = Window.width;
//const HEIGHT = Window.height;
const scale = 3;
const duration = 300;

export default {
  a: {x: -(WIDTH / 2) * 0.34, y: -(WIDTH / 2) * 0.3, scale, duration},
  b: {x: -(WIDTH / 2) * 0.076, y: -(WIDTH / 2) * 0.35, scale, duration},
  c: {x: (WIDTH / 2) * 0.09, y: -(WIDTH / 2) * 0.35, scale, duration},
  d: {x: (WIDTH / 2) * 0.26, y: -(WIDTH / 2) * 0.35, scale, duration},
  e: {x: (WIDTH / 2) * 0.09, y: -(WIDTH / 2) * 0.12, scale, duration},
  f: {x: (WIDTH / 2) * 0.72, y: -(WIDTH / 2) * 0.1, scale, duration},
  g: {x: (WIDTH / 2) * 0.71, y: (WIDTH / 2) * 0.3, scale, duration},
  h: {x: (WIDTH / 2) * 0.32, y: (WIDTH / 2) * 0.45, scale, duration},
  j: {x: (WIDTH / 2) * 0.443, y: (WIDTH / 2) * 0.22, scale, duration},
  k: {x: (WIDTH / 2) * 0.27, y: (WIDTH / 2) * 0.22, scale, duration},
  l: {x: -(WIDTH / 2) * 0.82, y: -(WIDTH / 2) * 0.2, scale, duration},
};