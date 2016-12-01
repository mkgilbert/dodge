/**
 * Created by mkg on 11/28/2016.
 */
/**
 * @providesModule
 */

import React, { Component, PropTypes } from 'react';
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
        let iconStyle = {
            position: 'absolute',
            left: this.props.xPos,
            top: this.props.yPos
        };

        return (
            <View>
                <Icon name="device-mobile" size={this.props.size} style={iconStyle} />
            </View>
        )
    }
}

Character.propTypes = {
    size: PropTypes.number.isRequired,
    xPos: PropTypes.number,
    yPos: PropTypes.number,
    window: PropTypes.object
};

export default Character;