/**
 * Created by mkg on 11/28/2016.
 */
/**
 * @providesModule
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    TextInput,
    View,
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

class Character extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Icon name="device-mobile" size={50} />
            </View>
        )
    }
}

export default Character;