import React from 'react';
import {Header, Grid, Row, Col, Button, Icon} from 'native-base';
import {TextInput} from 'react-native';
import Colors from '../constants/Colors';

export default class SearchBar extends React.Component {
  render() {
    return (
      <Header style={{backgroundColor: Colors.primary}}>
        <Grid>
          <Row>
            <Col
              size={1}
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Button
                transparent
                iconRight
                onPress={() => this.props.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Col>
            <Col
              size={5}
              style={{justifyContent: 'center', alignItems: 'flex-start'}}>
              <TextInput
                ref={ref => {
                  if (!this.inputRef) {
                    this.inputRef = ref;
                  }
                }}
                autoFocus={true}
                placeholder="Szukaj"
                placeholderTextColor="white"
                style={{
                  color: 'white',
                  fontSize: 20,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onChangeText={text => this.props.onChangeSearchQuery(text)}
              />
            </Col>
          </Row>
        </Grid>
      </Header>
    );
  }
}