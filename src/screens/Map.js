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
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Container,
  Icon,
  Text,
  H3,
  Content,
  Button,
  Grid,
  Row,
  Col,
  Thumbnail,
  Fab,
  List,
  ListItem,
  Card,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {connect as connectToStore} from 'react-redux';
import {request, PERMISSIONS} from 'react-native-permissions';
import Kontakt from 'react-native-kontaktio';
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from 'react-native-modal';
import SplashScreen from 'react-native-splash-screen';

import BottomSheet from '../components/BottomSheet';
import Floors from '../components/Floors';
import {
  setNamespace,
  addEddystone,
  deleteEddystones,
  updateEddystone,
  updateEddystones,
} from '../actions/beacons';
import {setObjectToShow} from '../actions/search';
import getBuildingCoordinates from '../utils/getBuildingCoordinates';
import getBuildingStyle from '../utils/getBuildingStyle';
import getBuildingConfig from '../utils/getBuildingConfig';
import mapNamespaceToBuldingName from '../utils/mapNamespaceToBuldingName';
import Colors from '../constants/Colors';
import Animated from 'react-native-reanimated';

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

/**
 * Główny widok aplikacji. Przedstawiający mapę kampusu.
 * @name
 * Map
 */
export class Map extends Component {
  state = {active: false, activeFloor: 0, clicked: null};
  eddystoneTimeouts = {};
  /**
   * Funkcja wyświetlająca alert odnośnie odmowy dostępu do lokalizacji urządzenia.
   */
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

  /**
   * Funkcja wyświetlająca zapytanie do użytkownika o pozwolenie na dostęp do lokalizacji użądzenia.
   */
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

  /**
   * Funkcja configuruje skanowanie beacon-ów.
   */
  connectBeacon = async () => {
    try {
      /**
       * Metoda z biblioteki kontakio. Ustawia typ skanowanych beacon-ów.
       * @param {String} key - klucz kontaktio (opcjonalny).
       * @param {String[]} types - typy wykrywanych beacon-ów.
       * @return {Promise} - zwraca obietnice.
       * @example connect('', ["EDDYSTONE"],);
       */
      await connect(
        '',
        [EDDYSTONE],
      );
      /**
       * Metoda z biblioteki kontakio. Konfiguruje parametry skanowania becon-ów.
       * @param {Object} params - obiekt zawierający parametry skanowania.
       * @return {Promise} - zwraca obietnice.
       * @example configure({scanMode: scanMode.LOW_LATENCY, scanPeriod: scanPeriod.RANGING});
       */
      await configure({
        scanMode: scanMode.LOW_LATENCY,
        scanPeriod: scanPeriod.RANGING,
        activityCheckConfiguration: activityCheckConfiguration.MINIMAL,
        forceScanConfiguration: forceScanConfiguration.MINIMAL,
        monitoringEnabled: monitoringEnabled.FALSE,
      });
      /**
       * Metoda z biblioteki kontakio. Ustawia wyszukiwane namespaces beacon-ów eddystone.
       * @return {Promise} - zwraca obietnice.
       * @example setEddystoneNamespace();
       */
      await setEddystoneNamespace();

      // DeviceEventEmitter.addListener('namespaceDidEnter', ({namespace}) => {
      //   console.log('!!!set namespace!!!', namespace);
      //   /** Ustawia aktualny namespace.  */
      //   this.props.setNamespace(namespace);
      // });

      // DeviceEventEmitter.addListener('namespaceDidExit', ({namespace}) => {
      //   console.log('!!!namespaceDidExit!!!', namespace);
      // });

      /**
       * Dodaje obsługę konkretnego zdarzenia.
       * @param {String} eventName - Nazwa zdarzenia.
       * @param {Function} onEvent - Funkcja wywoływana kiedy nastąpi zdarzenie.
       * @return {undefined} - brak
       * @example DeviceEventEmitter.addListener('eddystoneDidAppear', ({eddystone, namespace}) => {});
       */
      DeviceEventEmitter.addListener(
        'eddystoneDidAppear',
        ({eddystone, namespace}) => {
          if (
            this.eddystoneTimeouts[eddystone.namespace + eddystone.instanceId]
          ) {
            clearTimeout(
              this.eddystoneTimeouts[
                eddystone.namespace + eddystone.instanceId
              ],
            );
            delete this.eddystoneTimeouts[
              eddystone.namespace + eddystone.instanceId
            ];

            this.props.updateEddystone(eddystone);
          } else {
            /** Dodaje znaleziony beacon. */
            this.props.addEddystone(eddystone);
          }

          // let nearest = eddystone;

          // this.props.eddystones.forEach(eddy => {
          //   if (eddy.accuracy < eddy.accuracy) nearest = eddy;
          // });

          // this.props.setNamespace(nearest.namespace);
        },
      );

      DeviceEventEmitter.addListener(
        'eddystonesDidUpdate',
        ({eddystones, namespace}) => {
          let nearest = null;

          eddystones.forEach(eddystone => {
            if (!nearest) nearest = eddystone;
            if (eddystone.accuracy < nearest.accuracy) nearest = eddystone;
          });

          this.props.setNamespace(nearest.namespace);
          /** Aktualizuje parametry beacon-a. */
          this.props.updateEddystones(eddystones);
        },
      );

      DeviceEventEmitter.addListener(
        'eddystoneDidDisappear',
        ({eddystone, namespace}) => {
          //console.log('!!!eddystoneDidDisappear!!!', eddystone);

          this.eddystoneTimeouts[
            eddystone.namespace + eddystone.instanceId
          ] = setTimeout(() => {
            delete this.eddystoneTimeouts[
              eddystone.namespace + eddystone.instanceId
            ];

            /** Usuwa beacon, który zniknął z pola skanowania. */
            this.props.deleteEddystones(eddystone);
          }, 5000);
        },
      );

      //stopScanning();
      //startScanning();
    } catch (error) {
      console.log('error connectBeacon', error);
    }
  };

  /**
   * Funkcja zostaje wywołana kiedy komponent został zamontowany.
   */
  componentDidMount() {
    SplashScreen.hide();
    //this.imageZoomRef.centerOn({...getBuildingCoordinates['l'], duration: 1});
    //this.locationPermissionRequest();
  }

  /**
   * Funkcja zostaje wywołana kiedy komponent został zaktualizowany.
   */
  componentDidUpdate() {
    if (this.props.objectToShow && this.bottomSheet && this.imageZoomRef) {
      this.showBottomInfo();
    }
  }

  /**
   * Funkcja zostaje wywołana kiedy komponent zostanie odmontowany.
   */
  componentWillUnmount() {
    /**
     * Metoda z biblioteki kontakio. Rozłącza połączenie.
     * @return {undefined} - nic.
     * @example disconnect();
     */
    //disconnect();
    /**
     * Usuwa obsługę wszystkich zdarzeń.
     * @return {undefined} - nic.
     * @example removeAllListeners();
     */
    //DeviceEventEmitter.removeAllListeners();
  }

  /**
   * Funkcja przełączająca widok na Szukaj.
   */
  onSearchPress = async () => {
    this.props.navigation.navigate('Search');
  };

  /**
   * Funkcja rozwijająca dolny panel z informacjami.
   */
  showBottomInfo = () => {
    const {objectToShow} = this.props;
    // const buldingName = objectToShow.office.split('')[0].toLowerCase();
    this.bottomSheet.snapTo(1);
    // this.imageZoomRef.centerOn(getBuildingCoordinates[buldingName]);
  };

  /**
   * Metoda zwracająca komponenty intefejsu użytkownika.
   * @return {React.Component} any
   */
  render() {
    const {eddystones, namespace} = this.props;
    const {clicked} = this.state;

    const buildingStyle = getBuildingConfig['j'].style;

    const eddystoneItems = eddystones.map(eddy => (
      <ListItem key={eddy.namespace + eddy.instanceId}>
        <Grid>
          <Col>
            <Row>
              <Text>Namespace: {eddy.namespace}</Text>
            </Row>
            <Row>
              <Text>ID: {eddy.instanceId}</Text>
            </Row>
            <Row>
              <Text>Odległość: {eddy.accuracy}</Text>
            </Row>
          </Col>
        </Grid>
      </ListItem>
    ));
    return (
      <Container>
        <Button
          rounded
          iconLeft
          block
          style={{
            left: WIDTH * 0.05,
            right: WIDTH * 0.3,
            top: WIDTH * 0.05,
            position: 'absolute',
            zIndex: 1,
            opacity: 0.9,
            backgroundColor: Colors.primary,
          }}
          onPress={this.onSearchPress}>
          <Icon name="search" />
          <Text>Szukaj</Text>
        </Button>
        <Button
          rounded
          iconLeft
          block
          style={{
            left: WIDTH * 0.8,
            right: WIDTH * 0.05,
            top: WIDTH * 0.05,
            position: 'absolute',
            zIndex: 1,
            opacity: 0.9,
            backgroundColor: Colors.primary,
          }}
          onPress={async () => {
            if (await isScanning()) stopScanning();
            else startScanning();
          }}>
          <Icon name="play" />
        </Button>
        <BottomSheet
          getRef={r => (this.bottomSheet = r)}
          objectToShow={this.props.objectToShow}
          onClose={() => {
            this.props.setObjectToShow(null);
            this.imageZoomRef.centerOn({x: 0, y: 0, scale: 1, duration: 200});
          }}
        />

        <ScrollView
          style={{
            left: 20,
            right: 20,
            bottom: 20,
            position: 'absolute',
            zIndex: 1,
            opacity: 0.9,
            backgroundColor: Colors.secondary,
          }}>
          <List>{eddystoneItems}</List>
        </ScrollView>

        <Content style={{backgroundColor: '#eee'}}>
          <ImageZoom
            ref={ref => (this.imageZoomRef = ref)}
            cropWidth={WIDTH}
            cropHeight={HEIGHT}
            imageWidth={WIDTH}
            imageHeight={WIDTH}
            enableSwipeDown={false}
            doubleClickInterval={300}
            maxScale={3}
            minScale={1}
            onClick={() => {
              if (clicked) {
                this.props.navigation.navigate('Floor', {building: clicked});
                this.setState({clicked: null});
              }
            }}>
            <Image
              style={{width: WIDTH, height: WIDTH}}
              source={require('../assets/images/kampus.jpg')}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'a'})}
              style={getBuildingConfig['a'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'b'})}
              style={getBuildingConfig['b'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'c'})}
              style={getBuildingConfig['c'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'd'})}
              style={getBuildingConfig['d'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'e'})}
              style={getBuildingConfig['e'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'f'})}
              style={getBuildingConfig['f'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'g'})}
              style={getBuildingConfig['g'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'h'})}
              style={getBuildingConfig['h'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'j'})}
              style={getBuildingConfig['j'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'k'})}
              style={getBuildingConfig['k'].style}
            />
            <View
              onStartShouldSetResponder={() => this.setState({clicked: 'l'})}
              style={getBuildingConfig['l'].style}
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
  namespace: state.beacons.namespace,
  eddystones: state.beacons.eddystones,
  objectToShow: state.search.objectToShow,
});

const mapDispatchToProps = dispatch => ({
  setNamespace: namespace => dispatch(setNamespace(namespace)),
  addEddystone: eddystone => dispatch(addEddystone(eddystone)),
  deleteEddystones: eddystone => dispatch(deleteEddystones(eddystone)),
  updateEddystone: eddystone => dispatch(updateEddystone(eddystone)),
  updateEddystones: eddystones => dispatch(updateEddystones(eddystones)),
  setObjectToShow: obj => dispatch(setObjectToShow(obj)),
});

export default connectToStore(mapStateToProps, mapDispatchToProps)(Map);
