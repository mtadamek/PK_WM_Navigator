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

import {getInstitutesAndEmployees} from '../actions/search';
import {SERVER_URL} from '../../config';

export class QueryIsNotEmpty extends Component {
  componentDidMount() {
    this.props.getInstitutesAndEmployees();
  }

  onRefresh = () => {
    this.props.getInstitutesAndEmployees();
  };

  render() {
    const {dataToShow, loading} = this.props;
    const searchThumbnailsList = dataToShow.map(item => (
      <ListItem
        key={item._id}
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
          console.log(this.props);
          this.props.setObjectToShow(item);
          this.props.navigateTo('Home');
        }}>
        <Thumbnail square source={{uri: SERVER_URL + 'files/' + item.image}} />
        <Text style={{flex: 1, marginLeft: 15}}>
          {item.name || `${item.degree} ${item.forename} ${item.surname}`}
        </Text>
      </ListItem>
    ));
    return (
      <ScrollView
        style={{backgroundColor: '#eee'}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
        }>
        <List style={{backgroundColor: '#eee'}}>{searchThumbnailsList}</List>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  getInstitutesAndEmployees: () => dispatch(getInstitutesAndEmployees()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueryIsNotEmpty);
