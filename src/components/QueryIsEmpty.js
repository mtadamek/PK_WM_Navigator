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
} from 'native-base';
import {getCategories} from '../actions/search';
import mapCategoryName from '../utils/mapCategoryName';
import Colors from '../constants/Colors';
import {SERVER_URL} from '../../config'

class QueryIsEmpty extends Component {
  state = {modalVisible: false};

  componentDidMount() {
    if (this.props.categories.length === 0) this.props.getCategories();
  }

  onRefresh = () => {
    this.props.getCategories();
  };

  render() {
    const {loading, error, categories} = this.props;
    console.log(JSON.stringify(error));
    const categoryThumbnailsList = categories.map(c => (
      <ListItem
        key={c._id}
        style={{
          paddingLeft: 10,
          borderRadius: 10,
          marginRight: 10,
          marginTop: 5,
          marginLeft: 10,
          marginBottom: 5,
          backgroundColor: 'white',
        }}
        onPress={() => this.props.navigateTo(mapCategoryName[c.name])}>
        <Left>
          <Thumbnail
            large
            source={{uri: SERVER_URL + 'files/' + c.image}}
          />
        </Left>
        <Body style={{alignItems: 'flex-start', justifyContent: 'center'}}>
          <H3>{c.name}</H3>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    ));

    return (
      <Grid>
        <Row size={9} style={{backgroundColor: '#eee'}}>
          <Col>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this.onRefresh}
                />
              }>
              <List
                style={{
                  backgroundColor: '#eee',
                }}>
                {categoryThumbnailsList}
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
  categories: state.search.categories,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueryIsEmpty);