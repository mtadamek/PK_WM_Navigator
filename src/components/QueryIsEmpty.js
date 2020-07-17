import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, RefreshControl} from 'react-native';
import Modal from 'react-native-modal';
import {
  Left,
  Right,
  Col,
  Row,
  Grid,
  List,
  ListItem,
  Thumbnail,
  Body,
  Icon,
  Text,
  H3,
  Button,
  ActionSheet,
} from 'native-base';
import {getInstitutes} from '../actions/search';
import mapCategoryName from '../utils/mapCategoryName';
import getInstituteLogo from '../utils/getInstituteLogo';
import Colors from '../constants/Colors';
import {SERVER_URL} from '../../config';

const BUTTONS = [
  {text: 'Pokaż na mapie', icon: 'map', iconColor: '#ea943b'},
  {text: 'Pracownicy', icon: 'people', iconColor: '#2c8ef4'},
  {text: 'Cancel', icon: 'close', iconColor: '#fa213b'},
];
const CANCEL_INDEX = 2;

/**
 * Komponent wyświetlany na widoku Search, kiedy pole wyszukiwania jest puste.
 * @name QueryIsEmpty
 * @example <QueryIsEmpty navigateTo={(screenName, paramsObject)=>{}} setObjectToShow={(object)=>{}} />
 */
class QueryIsEmpty extends Component {
  state = {modalVisible: false};

  /** Metoda zostaje wywołana kiedy komponent został zamontowany. */
  componentDidMount() {
    if (this.props.institutes.length === 0) {
      /** Pobiera instytuty z serwera */
      this.props.getInstitutes();
    }
  }

  /** Metoda wywołująca się podczas odświeżenia komoponentu przez użytkownika. */
  onRefresh = () => this.props.getInstitutes();

  /** Metoda wywołująca się po wybraniu przez użytkownika opcji z menu akcji. */
  onActionSheetPress = (btnIndex, institute) => {
    switch (btnIndex) {
      case 0:
        this.props.setObjectToShow(institute);
        this.props.navigateTo('Map');
        break;
      case 1:
        this.props.navigateTo('Employees', {instituteId: institute.id});
        break;

      default:
        break;
    }
  };

  /**
   * Metoda zwracająca komponenty intefejsu użytkownika.
   * @return {React.Component} any
   */
  render() {
    const {loading, error, institutes} = this.props;

    institutes.forEach(element => {
      console.log(element.id);
    });

    const instituteThumbnailsList = institutes.map(institute => (
      <ListItem
        key={institute.id}
        style={{
          marginRight: 10,
          marginLeft: 10,
          marginTop: 5,
          marginBottom: 5,
          paddingLeft: 10,
          borderRadius: 10,
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={() =>
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
            },
            btnIndex => this.onActionSheetPress(btnIndex, institute),
          )
        }>
        <Thumbnail
          square
          source={
            getInstituteLogo[institute.id] ||
            require('../assets/images/institute.jpg')
          }
        />
        <Text style={{flex: 1, marginLeft: 15}}>{institute.text}</Text>
      </ListItem>
    ));

    return (
      <Grid>
        <Row size={9} style={{backgroundColor: '#eee'}}>
          <Col>
            <ScrollView
              refreshControl={
                <RefreshControl
                  size={RefreshControl.SIZE.LARGE}
                  refreshing={loading}
                  onRefresh={this.onRefresh}
                />
              }>
              <List style={{backgroundColor: '#eee'}}>
                {instituteThumbnailsList}
              </List>
            </ScrollView>
          </Col>
        </Row>
        {/* <Modal
          isVisible={this.state.modalVisible}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={500}
          style={{backgroundColor: '#eee', borderRadius: 10}}>
          <Body>
            <Text>MODAL</Text>
            <Button
              onPress={() => }>
              <Text>Zamknij</Text>
            </Button>
          </Body>
        </Modal> */}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  institutes: state.search.institutes,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  getInstitutes: () => dispatch(getInstitutes()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueryIsEmpty);
