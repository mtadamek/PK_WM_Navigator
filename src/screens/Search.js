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
import {setObjectToShow, setSearchQuery} from '../actions/search';

class Search extends React.Component {
  componentDidMount() {
    this.props.setSearchQuery('');
  }

  onChangeSearchQuery = text => this.props.setSearchQuery(text);

  goBack = () => this.props.navigation.goBack();

  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  // const {institutes, employees} = payload;
  //   const instituteNames = institutes.map(i => i.name.toUpperCase());
  //   const employeeNames = employees.map(
  //     e =>
  //       `${e.degree.toUpperCase()} ${e.forename.toUpperCase()} ${e.surname.toUpperCase()}`,
  //   );
  //   const names = instituteNames.concat(employeeNames);

  render() {
    const {query, error, institutes, employees} = this.props;
    let dataToShow = [];
    if (query) {
      const all = institutes.concat(employees);
      dataToShow = all.filter(item => {
        const name = item.name
          ? item.name.toUpperCase()
          : `${item.degree.toUpperCase()} ${item.forename.toUpperCase()} ${item.surname.toUpperCase()}`;

        return name.indexOf(query.toUpperCase()) > -1;
      });
    }

    return (
      <Container>
        <SearchBar
          onChangeSearchQuery={this.onChangeSearchQuery}
          goBack={this.goBack}
        />
        {query === '' ? (
          <QueryIsEmpty
            navigateTo={this.navigateTo}
            setObjectToShow={this.props.setObjectToShow}
          />
        ) : (
          <QueryIsNotEmpty
            navigateTo={this.navigateTo}
            setObjectToShow={this.props.setObjectToShow}
            dataToShow={dataToShow}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query,
  institutes: state.search.institutes,
  employees: state.search.employees,
});

const mapDispatchToProps = dispatch => ({
  setSearchQuery: text => dispatch(setSearchQuery(text)),
  setObjectToShow: obj => dispatch(setObjectToShow(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
