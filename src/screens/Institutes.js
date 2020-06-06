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
import {getInstitutes, setInstituteToShow} from '../actions/search';

export class Institutes extends Component {
  componentDidMount() {
    if (this.props.institutes.length === 0) this.props.getInstitutes();
  }

  onRefresh = () => this.props.getInstitutes();

  onPress = institute => {
    this.props.setInstituteToShow(institute);
    this.props.navigation.navigate('Home');
  };

  render() {
    const {loading, error, institutes} = this.props;
    const instituteThumbnailsList = institutes.map(i => (
      <ListItem
        key={i._id}
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
        onPress={() => this.onPress(i)}>
        <Thumbnail
          square
          large
          source={{uri: 'http://192.168.1.200:4444/files/' + i.image}}
        />
        <Text style={{flex: 1, marginLeft: 15}}>{i.name}</Text>
      </ListItem>
    ));
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
        }>
        <List style={{backgroundColor: '#eee'}}>{instituteThumbnailsList}</List>
      </ScrollView>
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
  setInstituteToShow: institute => dispatch(setInstituteToShow(institute)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Institutes);