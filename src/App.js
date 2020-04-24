import React, {Component} from 'react';
import {Text, View, Alert, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {request, PERMISSIONS} from 'react-native-permissions';
 
export class App extends Component {
  locationPermissionDeniedAlert = () => {
    Alert.alert(
      'Odmowa dostępu do lokalizacji!',
      'Aby aplikacja działała poprawnie, konieczny jest dostęp do usług lokalizacyjnych Twojego telefonu.',
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
 
  componentDidMount() {
    this.locationPermissionRequest();
  }
 
  render() {
    return (
      <View>
        <Text>PK WM Navigator</Text>
      </View>
    );
  }
}
 
const mapStateToProps = state => ({
  eddystones: state.beacons.eddystones,
});
 
const mapDispatchToProps = {};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
 