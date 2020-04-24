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

import {addEddystone} from './actions/beacons';

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
    } catch (error) {}
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
          console.log('!!!Dodano beacon!!!', eddystone.instanceId);
          this.props.addEddystone(eddystone);
        },
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  async componentDidMount() {
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
        <Text>PK WM Navigator</Text>
        <Button title="Start scanning" onPress={() => startScanning()} />
        <Button title="Stop scanning" onPress={() => stopScanning()} />
        <FlatList
          data={eddystones}
          renderItem={({item}) => <Text>{item.instanceId}</Text>}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  eddystones: state.beacons.eddystones,
});

const mapDispatchToProps = dispatch => ({
  addEddystone: eddystone => {
    dispatch(addEddystone(eddystone));
  },
});

export default connectToStore(mapStateToProps, mapDispatchToProps)(App);
