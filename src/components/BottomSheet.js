import React, {Component} from 'react';
import {
  View,
  Alert,
  BackHandler,
  DeviceEventEmitter,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
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
} from 'native-base';
import {BoxShadow} from 'react-native-shadow';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BSheet from 'reanimated-bottom-sheet';

import {SERVER_URL} from '../../config';

const Window = Dimensions.get('window');
const WIDTH = Window.width;
const HEIGHT = Window.height;

export default class BottomSheet extends Component {
  renderContent = () => {
    const {objectToShow} = this.props;

    return objectToShow ? (
      <BoxShadow
        setting={{
          width: WIDTH,
          height: 100,
          color: '#000',
          border: 6,
          radius: 10,
          opacity: 0.1,
          style: {marginVertical: 10},
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: HEIGHT * 0.8,
            borderRadius: 10,
          }}>
          <Grid>
            <Row
              size={1}
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <Col
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Icon name="remove" style={{fontSize: 40, color: '#ddd'}} />
              </Col>
            </Row>
            <Row size={5}>
              <Col
                size={1}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Thumbnail
                  square
                  source={{
                    uri: SERVER_URL + 'files/' + objectToShow.image,
                  }}
                  style={{height: '75%', width: '75%'}}
                />
              </Col>
              <Col
                size={2}
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <H3 style={{marginLeft: 10, marginRight: 18}}>
                  {objectToShow.name ||
                    `${objectToShow.degree} ${objectToShow.forename} ${
                      objectToShow.surname
                    }`}
                </H3>
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    fontSize: 18,
                  }}>
                  {objectToShow.name ? 'Sekretariat:' : 'Gabinet:'}{' '}
                  {objectToShow.office}
                </Text>
              </Col>
            </Row>
            <Row size={13}>
              <Col
                size={1}
                style={{
                  backgroundColor: 'white',
                  marginLeft: 18,
                  marginRight: 18,
                }}>
                {objectToShow.address && (
                  <TouchableOpacity
                    onPress={() => Linking.openURL('geo:50.074987, 19.997728')}>
                    <Text style={{fontSize: 18, marginBottom: 7}}>
                      Adres: {objectToShow.address}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('mailto:' + objectToShow.email)
                  }>
                  <Text style={{fontSize: 18, marginBottom: 7}}>
                    Email: {objectToShow.email}
                  </Text>
                </TouchableOpacity>
                {objectToShow.phone && (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL('tel:' + objectToShow.phone)
                    }>
                    <Text style={{fontSize: 18, marginBottom: 7}}>
                      Telefon: {objectToShow.phone}
                    </Text>
                  </TouchableOpacity>
                )}
              </Col>
            </Row>
          </Grid>
        </View>
      </BoxShadow>
    ) : (
      <View
        style={{
          backgroundColor: 'white',
          height: HEIGHT * 0.8,
          borderRadius: 10,
        }}
      />
    );
  };

  render() {
    return (
      <BSheet
        ref={this.props.getRef}
        snapPoints={[HEIGHT * 0.6, HEIGHT * 0.27, 0]}
        initialSnap={2}
        renderContent={this.renderContent}
        borderRadius={10}
        onCloseEnd={this.props.onClose}
      />
    );
  }
}
