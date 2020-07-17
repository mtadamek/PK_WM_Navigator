import React, {Component} from 'react';
import {
  RefreshControl,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
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
import {getEmployees, clearEmployees, setObjectToShow} from '../actions/search';
import {SERVER_URL} from '../../config';

/**
 * Widok "Pracownicy"
 * @name Employees
 */
export class Employees extends Component {
  state = {page: 1, pages: null};

  /** Metoda zostaje wywołana kiedy komponent został zamontowany. */
  componentDidMount() {
    const {params} = this.props.route;
    if (params && params.instituteId) {
      /**
       * Pobiera pracowników danego instytutu z serwera
       * @param {string} instituteId - Identyfikator instytutu
       */
      this.props.getEmployees(params.instituteId, this.state.page);
    }
  }

  componentWillUnmount() {
    this.props.clearEmployees();
  }

  /** Metoda wywołująca się podczas odświeżenia widoku przez użytkownika. */
  onRefresh = () => {
    const {params} = this.props.route;
    if (params && params.instituteId) {
      this.props.clearEmployees();
      this.props.getEmployees(params.instituteId, 1);
    }
  };

  /**
   * Metoda wywołująca się po tapniąciu na pracownika.
   * @param {object} employee - zawiera informacje pracownika
   */
  onPress = employee => {
    this.props.setObjectToShow(employee);
    this.props.navigation.navigate('Map');
  };

  getMore = () => {
    const {page} = this.state;
    const {pages} = this.props;
    if (pages && page <= pages) {
      const {params} = this.props.route;
      this.setState({page: page + 1}, () =>
        this.props.getEmployees(params.instituteId, this.state.page),
      );
    }
  };

  /**
   * Metoda zwracająca komponenty intefejsu użytkownika.
   * @return {React.Component} any
   */
  render() {
    const {loading, error, employees} = this.props;
    const {page} = this.state;

    return (
      // <ScrollView
      //   style={{backgroundColor: '#eee'}}
      //   contentContainerStyle={{flex: 1}}
      //   refreshControl={
      //     <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
      //   }>
      //   <List
      //     onEndReached={() => console.log('hehe')}
      //     style={{backgroundColor: '#eee'}}>
      //     {employeeThumbnailsList}
      //   </List>
      // </ScrollView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
        }
        data={employees}
        keyExtractor={(x, i) => x.dn}
        onEndReached={() => this.getMore()}
        onEndReachedThreshold={0.1}
        // ListFooterComponent={() =>
        //   loading &&
        //   employees.length > 0 && <ActivityIndicator size="large" animating />
        // }
        renderItem={({item}) => (
          <ListItem
            key={item.dn}
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
              this.props.setObjectToShow(item);
              this.props.navigation.navigate('Map');
            }}>
            <Thumbnail
              square
              source={
                item.givenName.split('').pop() === 'a'
                  ? require('../assets/images/woman.png')
                  : require('../assets/images/man.png')
              }
            />
            <Text style={{flex: 1, marginLeft: 15}}>
              {item.pleduPersonDegree === '---'
                ? ''
                : `${item.pleduPersonDegree} `}
              {item.givenName} {item.sn}
            </Text>
          </ListItem>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  employees: state.search.employees,
  pages: state.search.pages,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  getEmployees: (instituteId, page) =>
    dispatch(getEmployees(instituteId, page)),
  clearEmployees: () => dispatch(clearEmployees()),
  setObjectToShow: obj => dispatch(setObjectToShow(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Employees);
