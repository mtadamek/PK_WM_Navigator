import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import store from './store';
import App from './App';
import Detail from './screens/Detail';

const Tab = createBottomTabNavigator();

const Init = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: 'blue',
          keyboardHidesTabBar: true,
        }}>
        <Tab.Screen name="Home" component={gestureHandlerRootHOC(App)} />
        <Tab.Screen name="Detail" component={gestureHandlerRootHOC(Detail)} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default Init;
