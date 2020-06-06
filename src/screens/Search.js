import React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Button,
  Switch,
  Input,
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
  H1,
  H2,
  H3,
  InputGroup,
  Item,
  Spinner,
} from 'native-base';
import SearchBar from '../components/SearchBar';
import QueryIsEmpty from '../components/QueryIsEmpty';
import QueryIsNotEmpty from '../components/QueryIsNotEmpty';
import {getCategories, setSearchQuery} from '../actions/search';

class Search extends React.Component {
  componentDidMount() {
    this.props.setSearchQuery('');
  }

  onChangeSearchQuery = text => this.props.setSearchQuery(text);

  goBack = () => this.props.navigation.goBack();

  navigateTo = screen => this.props.navigation.navigate(screen);

  render() {
    const {query, error} = this.props;
    
    return (
      <Container>
        <SearchBar
          onChangeSearchQuery={this.onChangeSearchQuery}
          goBack={this.goBack}
        />
        {query === '' ? (
          <QueryIsEmpty navigateTo={this.navigateTo} />
        ) : (
          <QueryIsNotEmpty />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query,
});

const mapDispatchToProps = dispatch => ({
  setSearchQuery: text => dispatch(setSearchQuery(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
