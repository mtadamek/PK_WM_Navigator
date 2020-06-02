import React from 'react';
import {TextInput} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Input,
  Left,
  Right,
  Body,
  Icon,
  Text,
  InputGroup,
  Item,
} from 'native-base';
import Colors from '../constants/Colors';

class Search extends React.Component {
  componentDidMount() {}
  render() {
    console.log(this.searchInput);
    return (
      <Container>
        <Header style={{backgroundColor: Colors.primary}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Input
              getRef={input => {
                this.searchInput = input;
              }}
              placeholder="Szukaj"
              placeholderTextColor="white"
              style={{color: 'white'}}
            />
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>This is Content Section</Text>
        </Content>
      </Container>
    );
  }
}

export default Search;
