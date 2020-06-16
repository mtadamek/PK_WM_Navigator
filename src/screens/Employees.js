import React, {Component} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Icon,
  Text,
  H3,
  Image,
} from 'native-base';
import {connect} from 'react-redux';
import {getEmployees, setObjectToShow} from '../actions/search';
import {SERVER_URL} from '../../config';

/**
 * Widok "Pracownicy"
 * @name Employees
 */
export class Employees extends Component {
  /** Metoda zostaje wywołana kiedy komponent został zamontowany. */
  componentDidMount() {
    const {params} = this.props.route;
    if (params && params.instituteId) {
      /**
       * Pobiera pracowników danego instytutu z serwera
       * @param {string} instituteId - Identyfikator instytutu
       */
      this.props.getEmployees(params.instituteId);
    }
  }

  /** Metoda wywołująca się podczas odświeżenia widoku przez użytkownika. */
  onRefresh = () => {
    const {params} = this.props.route;
    if (params && params.instituteId)
      this.props.getEmployees(params.instituteId);
  };

  /**
   * Metoda wywołująca się po tapniąciu na pracownika.
   * @param {object} employee - zawiera informacje pracownika
   */
  onPress = employee => {
    this.props.setObjectToShow(employee);
    this.props.navigation.navigate('Home');
  };

  /**
   * Metoda zwracająca komponenty intefejsu użytkownika.
   * @return {React.Component} any
   */
  render() {
    const {loading, error, employees} = this.props;
    const employeeThumbnailsList = employees.map(employee => (
      <ListItem
        key={employee._id}
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
        onPress={() => {
          this.props.setObjectToShow(employee);
          this.props.navigation.navigate('Home');
        }}>
        <Thumbnail
          square
          source={{uri: SERVER_URL + 'files/' + employee.image}}
        />
        <Text style={{flex: 1, marginLeft: 15}}>
          {employee.degree} {employee.forename} {employee.surname}
        </Text>
      </ListItem>
    ));
    return (
      <ScrollView
        style={{backgroundColor: '#eee'}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
        }>
        <List style={{backgroundColor: '#eee'}}>{employeeThumbnailsList}</List>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  employees: state.search.employees,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  getEmployees: instituteId => dispatch(getEmployees(instituteId)),
  setObjectToShow: obj => dispatch(setObjectToShow(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Employees);