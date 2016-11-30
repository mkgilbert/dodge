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
import Matter from 'matter-js';

class Character extends Component {


    static contextTypes = {
        engine: PropTypes.object,
        scale: PropTypes.number,
    };

    constructor(props) {
        super(props);
    }

    move = (body, x) => {
        Matter.Body.setVelocity(body, { x, y: 0});
    };

    render() {
        //let x_pos = this.props.x_pos;
        let x_pos = this.props.x_pos;
        let iconStyle = {
            position: 'absolute',
            left: x_pos,
            top: this.props.window.height-200
        };

        return (
            <View>
                <Icon name="device-mobile" size={50} style={iconStyle} />
            </View>
        )
    }
}

Character.propTypes = {
    x_pos: PropTypes.number,
    window: PropTypes.object
};

export default Character;