import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'native-base';
import store from './store';
import App from './App';
import Search from './screens/Search';
import Detail from './screens/Detail';
import Colors from './constants/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Map = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{headerShown: false}}
      component={gestureHandlerRootHOC(App)}
    />
    <Stack.Screen
      name="Search"
      options={{
        headerShown: false,
      }}
      component={Search}
    />
  </Stack.Navigator>
);

const Init = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size}) => {
            let iconName;
            const color = focused ? Colors.primary : Colors.secondary;

            if (route.name === 'Map') {
              iconName = 'map';
            } else if (route.name === 'Detail') {
              iconName = 'list';
            }

            return <Icon name={iconName} size={size} style={{color}} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.primary,
          inactiveTintColor: Colors.secondary,
          keyboardHidesTabBar: true,
        }}>
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Detail" component={gestureHandlerRootHOC(Detail)} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default Init;
