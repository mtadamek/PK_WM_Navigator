import React, { Component } from 'react'
import {
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux'

export class App extends Component {
    render() {
        return (
            <View><Text>PK WM Navigator</Text></View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
