import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from './store';
import App from './App';
import Detail from './screens/Detail';

const {Navigator, Screen} = createStackNavigator();

const Init = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          component={App}
          options={{title: 'PK WM Navigator'}}
        />
        <Screen name="Detail" component={Detail} />
      </Navigator>
    </NavigationContainer>
  </Provider>
);

export default Init;
