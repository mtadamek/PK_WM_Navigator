import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import ImageZoom from 'react-native-image-pan-zoom';

import Floors from '../components/Floors';
import getBuildingConfig from '../utils/getBuildingConfig';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Container,
  Content,
} from 'native-base';

import Colors from '../constants/Colors';

const Window = Dimensions.get('window');
const WIDTH = Window.width;
const HEIGHT = Window.height;

export class Floor extends Component {
  state = {activeFloor: 0};

  componentDidMount() {}

  render() {
    const {params} = this.props.route;
    const {building} = params;

    const buildingConfig = getBuildingConfig[building];
    const buildingFloorsCount = buildingConfig.floors.length;
    const activeFloor = buildingConfig.floors[this.state.activeFloor];
    const activeRooms = activeFloor.rooms;

    return (
      <Container>
        <Header style={{backgroundColor: Colors.primary}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              Budynek: {building.toUpperCase()}, piętro:{' '}
              {this.state.activeFloor}
            </Title>
          </Body>
        </Header>
        <Content>
          <ImageZoom
            ref={ref => (this.imageZoomRef = ref)}
            cropWidth={WIDTH}
            cropHeight={HEIGHT}
            imageWidth={activeFloor.imageZoomWidth}
            imageHeight={activeFloor.imageZoomHeight}
            enableSwipeDown={false}
            doubleClickInterval={300}
            maxScale={3}
            minScale={1}
            onClick={() => {}}>
            <Image
              style={{
                ...activeFloor.imageStyle,
                marginTop: HEIGHT * 0.02,
              }}
              source={activeFloor.map}
            />
            {activeRooms}
          </ImageZoom>
        </Content>
        <Floors
          floorsCount={buildingFloorsCount}
          onFloorPress={floor => this.setState({activeFloor: floor})}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Floor);
