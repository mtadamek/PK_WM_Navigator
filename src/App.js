import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  BackHandler,
  DeviceEventEmitter,
  Button,
  FlatList,
} from 'react-native';
import {connect as connectToStore} from 'react-redux';
import {request, PERMISSIONS} from 'react-native-permissions';
import Kontakt from 'react-native-kontaktio';

import {
  addEddystone,
  deleteEddystones,
  updateEddystones,
} from './actions/beacons';

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
      await connect('', [EDDYSTONE]);
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
          // eddystones.forEach(eddystone => {
          //   console.log('!!!Aktualizacja!!!', eddystone.instanceId);
          // });
          console.log('!!!Aktualizacja!!!', eddystones);
          // for (let index = 0; index < eddystones.length; index++) {
          //   console.log('!!!Aktualizacja!!!', eddystones[index].instanceId);
          // }
          this.props.updateEddystones(eddystones);
        },
      );
    } catch (error) {
      console.log('error connectBeacon', error);
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
      <View>
        <Button title="Start scanning" onPress={() => startScanning()} />
        <Button title="Stop scanning" onPress={() => stopScanning()} />
        {/* <Button
          title="Detail"
          onPress={() => this.props.navigation.navigate('Detail')}
        /> */}
        <FlatList
          data={eddystones}
          renderItem={({item, index}) => {
            return (
              <View>
                <Text>Beacon ID: {item.instanceId}</Text>
                <Text>Odległość: {item.accuracy.toFixed(1)}m</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  eddystones: state.beacons.eddystones,
});

const mapDispatchToProps = (dispatch) => ({
  addEddystone: (eddystone) => dispatch(addEddystone(eddystone)),
  deleteEddystones: (id) => dispatch(deleteEddystones(id)),
  updateEddystones: (eddystones) => dispatch(updateEddystones(eddystones)),
});

export default connectToStore(mapStateToProps, mapDispatchToProps)(App);
