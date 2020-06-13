import React, {Component} from 'react';
import {
  View,
  Alert,
  BackHandler,
  DeviceEventEmitter,
  StyleSheet,
  Dimensions,
  Linking,
  Image,
} from 'react-native';
import {
  Container,
  Icon,
  Button,
  Text,
  H3,
  Content,
  Grid,
  Row,
  Col,
  Thumbnail,
  Fab,
} from 'native-base';
import {connect as connectToStore} from 'react-redux';
import {request, PERMISSIONS} from 'react-native-permissions';
import Kontakt from 'react-native-kontaktio';
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from 'react-native-modal';
import SplashScreen from 'react-native-splash-screen';

import BottomSheet from './components/BottomSheet';
import {
  addEddystone,
  deleteEddystones,
  updateEddystones,
} from './actions/beacons';
import {setObjectToShow} from './actions/search';
import getBuildingCoordinates from './utils/getBuildingCoordinates';
import Colors from './constants/Colors';

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

const Window = Dimensions.get('window');
const WIDTH = Window.width;
const HEIGHT = Window.height;

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
      //stopScanning();
      //startScanning();
    } catch (error) {
      console.log('error connectBeacon', error);
    }
  };

  componentDidMount() {
    SplashScreen.hide();
    this.locationPermissionRequest();
  }

  componentDidUpdate() {
    if (this.props.objectToShow && this.bottomSheet && this.imageZoomRef) {
      this.showBottomInfo();
    }
  }

  componentWillUnmount() {
    disconnect();
    DeviceEventEmitter.removeAllListeners();
  }

  onSearchPress = () => {
    this.props.navigation.navigate('Search');
  };

  showBottomInfo = () => {
    const {objectToShow} = this.props;
    const buldingName = objectToShow.office.split('')[0].toLowerCase();
    this.bottomSheet.snapTo(1);
    this.imageZoomRef.centerOn(getBuildingCoordinates[buldingName]);
  };

  render() {
    const {eddystones} = this.props;
    console.log(eddystones);
    return (
      <Container>
        <Button
          rounded
          iconLeft
          block
          style={{
            left: 20,
            right: 20,
            top: 20,
            position: 'absolute',
            zIndex: 1,
            opacity: 0.9,
            backgroundColor: Colors.primary,
          }}
          onPress={this.onSearchPress}>
          <Icon name="search" />
          <Text>Szukaj</Text>
        </Button>
        <BottomSheet
          getRef={r => (this.bottomSheet = r)}
          objectToShow={this.props.objectToShow}
          onClose={() => {
            this.props.setObjectToShow(null);
            this.imageZoomRef.centerOn({x: 0, y: 0, scale: 1, duration: 200});
          }}
        />
        <Content style={{backgroundColor: '#eee'}}>
          <ImageZoom
            ref={ref => (this.imageZoomRef = ref)}
            cropWidth={WIDTH}
            cropHeight={HEIGHT * 0.95}
            imageWidth={WIDTH}
            imageHeight={WIDTH}
            enableSwipeDown={false}
            doubleClickInterval={300}
            maxScale={3}
            minScale={1}>
            <Image
              style={{width: WIDTH, height: WIDTH}}
              source={require('./assets/images/kampus.jpg')}
            />
          </ImageZoom>
        </Content>
      </Container>
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
  objectToShow: state.search.objectToShow,
});

const mapDispatchToProps = dispatch => ({
  addEddystone: eddystone => dispatch(addEddystone(eddystone)),
  deleteEddystones: id => dispatch(deleteEddystones(id)),
  updateEddystones: eddystones => dispatch(updateEddystones(eddystones)),
  setObjectToShow: obj => dispatch(setObjectToShow(obj)),
});

export default connectToStore(mapStateToProps, mapDispatchToProps)(App);
