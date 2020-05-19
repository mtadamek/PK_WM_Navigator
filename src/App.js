import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  BackHandler,
  DeviceEventEmitter,
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Animated,
} from 'react-native';
import {connect as connectToStore} from 'react-redux';
import {request, PERMISSIONS} from 'react-native-permissions';
import Kontakt from 'react-native-kontaktio';

import {
  addEddystone,
  deleteEddystones,
  updateEddystones,
} from './actions/beacons';
import {
  PinchGestureHandler,
  State,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const {
  connect,
  disconnect,
  configure,
  setEddystoneNamespace,
  startScanning,
  stopScanning,
  isScanning,
  EDDYSTONE,
  scanMode,
  scanPeriod,
  activityCheckConfiguration,
  forceScanConfiguration,
  monitoringEnabled,
} = Kontakt;

export class App extends Component {
  locationPermissionDeniedAlert = () => {
    Alert.alert(
      'Odmowa dostępu do lokalizacji!',
      'Aby aplikacja działała poprawnie, konieczny jest dostęp do usług lokalizacyjnych Twojego urządzenia.',
      [
        {
          text: 'Anuluj',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {text: 'Przyznaj', onPress: () => this.locationPermissionRequest()},
      ],
      {cancelable: false},
    );
  };

  locationPermissionRequest = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log(`PERMISSIONS ${result}`);
      switch (result) {
        case 'granted':
          console.log('Przyznano uprawnienia!');
          this.connectBeacon();
          break;
        case 'denied':
          console.log('Odmowa uprawinień!');
          this.locationPermissionDeniedAlert();
          break;

        default:
          console.log('Brak uprawnień!');
          break;
      }
    } catch (error) {
      console.log('error locationPermissionRequest', error);
    }
  };

  connectBeacon = async () => {
    try {
      await connect(
        '',
        [EDDYSTONE],
      );
      await configure({
        scanMode: scanMode.LOW_LATENCY,
        scanPeriod: scanPeriod.RANGING,
        activityCheckConfiguration: activityCheckConfiguration.MINIMAL,
        forceScanConfiguration: forceScanConfiguration.MINIMAL,
        monitoringEnabled: monitoringEnabled.FALSE,
      });
      await setEddystoneNamespace();

      DeviceEventEmitter.addListener(
        'eddystoneDidAppear',
        ({eddystone, namespace}) => {
          console.log('!!!Dodano beacon!!!', eddystone);
          this.props.addEddystone(eddystone);
        },
      );

      DeviceEventEmitter.addListener(
        'eddystoneDidDisappear',
        ({eddystone, namespace}) => {
          console.log('!!!eddystoneDidDisappear!!!', eddystone);
          this.props.deleteEddystones(eddystone.instanceId);
        },
      );

      DeviceEventEmitter.addListener(
        'eddystonesDidUpdate',
        ({eddystones, namespace}) => {
          eddystones.forEach(eddystone => {
            console.log('!!!Aktualizacja!!!', eddystone.instanceId);
          });
          this.props.updateEddystones(eddystones);
        },
      );
    } catch (error) {
      console.log('error connectBeacon', error);
    }
  };

  translationX = new Animated.Value(0);
  lastTransX = 0;

  translationY = new Animated.Value(0);
  lastTransY = 0;

  baseScale = new Animated.Value(1);
  pinchScale = new Animated.Value(1);
  scale = Animated.multiply(this.baseScale, this.pinchScale);
  lastScale = 1;

  onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: this.translationX,
          translationY: this.translationY,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  onPanStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastTransX += event.nativeEvent.translationX;
      this.translationX.setOffset(this.lastTransX);
      this.translationX.setValue(0);

      this.lastTransY += event.nativeEvent.translationY;
      this.translationY.setOffset(this.lastTransY);
      this.translationY.setValue(0);
    }
  };

  onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {scale: this.pinchScale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  onPinchStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale;
      this.baseScale.setValue(this.lastScale);
      this.pinchScale.setValue(1);
    }
  };

  componentDidMount() {
    this.locationPermissionRequest();
  }

  componentWillUnmount() {
    disconnect();
    DeviceEventEmitter.removeAllListeners();
  }

  render() {
    const {eddystones} = this.props;

    return (
      //style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <PanGestureHandler
        onGestureEvent={this.onPanEvent}
        onHandlerStateChange={this.onPanStateChange}
        minDist={10}
        minPointers={1}
        maxPointers={1}>
        <Animated.View>
          <PinchGestureHandler
            onGestureEvent={this.onPinchEvent}
            onHandlerStateChange={this.onPinchStateChange}>
            <Animated.Image
              source={require('./assets/images/kampus.jpg')}
              style={[
                {
                  transform: [
                    {perspective: 200},
                    {scale: this.scale},
                    {translateX: this.translationX},
                    {translateY: this.translationY},
                  ],
                },
              ]}
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
      // {/* <Button
      //     title="Detail"
      //     onPress={() => this.props.navigation.navigate('Detail')}
      //   /> */}
      //   {/* <FlatList
      //       data={eddystones}
      //       renderItem={({item, index}) => {
      //         return (
      //           <View>
      //             <Text style={styles.listItemText}>
      //               Beacon ID: {item.instanceId}
      //             </Text>
      //             <Text style={styles.listItemText}>
      //               Odległość: {item.accuracy.toFixed(1)}m
      //             </Text>
      //           </View>
      //         );
      //       }}
      //       keyExtractor={(item, index) => index.toString()}
      //     />
      //     <Button title="Start scanning" onPress={() => startScanning()} />
      //     <Button title="Stop scanning" onPress={() => stopScanning()} /> */}
      //   {/* <View style={styles.testBox}>
      //       <Text>asd</Text>
      //     </View> */}
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
  listItemText: {
    color: 'white',
  },
  testBox: {
    position: 'absolute',
    top: 0,
    left: 50,
    width: 50,
    height: 100,
    backgroundColor: 'red',
  },
});

const mapStateToProps = state => ({
  eddystones: state.beacons.eddystones,
});

const mapDispatchToProps = dispatch => ({
  addEddystone: eddystone => dispatch(addEddystone(eddystone)),
  deleteEddystones: id => dispatch(deleteEddystones(id)),
  updateEddystones: eddystones => dispatch(updateEddystones(eddystones)),
});

export default connectToStore(mapStateToProps, mapDispatchToProps)(App);
