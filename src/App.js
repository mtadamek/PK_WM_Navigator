import React, {Component} from 'react';
import {
  View,
  Alert,
  BackHandler,
  DeviceEventEmitter,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Content,
} from 'native-base';
import {connect as connectToStore} from 'react-redux';
import {request, PERMISSIONS} from 'react-native-permissions';
import Kontakt from 'react-native-kontaktio';
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from 'react-native-modal';
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
          eddystones.forEach((eddystone) => {
            console.log('!!!Aktualizacja!!!', eddystone.instanceId);
          });
          this.props.updateEddystones(eddystones);
        },
      );
    } catch (error) {
      console.log('error connectBeacon', error);
    }
  };

  componentDidMount() {
    //this.locationPermissionRequest();
  }

  componentWillUnmount() {
    console.log('unmount');

    // disconnect();
    // DeviceEventEmitter.removeAllListeners();
  }

  onSearchPress = () => {
    console.log('search');
    this.props.navigation.navigate('Search');
  };

  render() {
    const {eddystones, navigation} = this.props;

    return (
      <Container>
        {/* <Header searchBar rounded>
          <Item>
            <Icon name="search" />
            <Input placeholder="Search" />
            <Icon name="people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header> */}
        <Button
          rounded
          iconLeft
          block
          style={{
            left: 20,
            right: 20,
            top: 10,
            position: 'absolute',
            zIndex: 1,
            opacity: 0.9,
          }}
          onPress={this.onSearchPress}>
          <Icon name="search" />
          <Text>Szukaj</Text>
        </Button>
        <Content>
          <ImageZoom
            ref={(ref) => (this.ImageZoomRef = ref)}
            cropWidth={WIDTH}
            cropHeight={HEIGHT * 0.9}
            imageWidth={WIDTH}
            imageHeight={WIDTH}
            enableSwipeDown={false}
            maxScale={2.5}
            minScale={1}>
            <Image
              style={{width: WIDTH, height: WIDTH}}
              source={require('./assets/images/kampus.jpg')}
            />
            {/* <TouchableOpacity
            style={{
              width: WIDTH * 0.095,
              height: WIDTH * 0.185,
              left: WIDTH * 0.095,
              top: WIDTH * 0.225,
              borderColor: 'red',
              borderWidth: 1,
              position: 'absolute',
            }}
          />
          <TouchableOpacity
            style={{
              width: WIDTH * 0.25,
              height: WIDTH * 0.185,
              left: WIDTH * 0.23,
              top: WIDTH * 0.22,
              borderColor: 'red',
              borderWidth: 1,
              position: 'absolute',
            }}
          /> */}
          </ImageZoom>
          <Modal isVisible={false}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <Text>I am the modal content!</Text>
            </View>
          </Modal>
        </Content>
      </Container>
      //</View>
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

const mapStateToProps = (state) => ({
  eddystones: state.beacons.eddystones,
});

const mapDispatchToProps = (dispatch) => ({
  addEddystone: (eddystone) => dispatch(addEddystone(eddystone)),
  deleteEddystones: (id) => dispatch(deleteEddystones(id)),
  updateEddystones: (eddystones) => dispatch(updateEddystones(eddystones)),
});

export default connectToStore(mapStateToProps, mapDispatchToProps)(App);
