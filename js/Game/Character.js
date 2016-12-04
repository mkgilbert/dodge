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
    BackAndroid,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

class Character extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let iconStyle = {
            width: this.props.size.width,
            height: this.props.size.height,
            backgroundColor: 'white',
            position: 'absolute',
            left: this.props.xPos,
            top: this.props.yPos
        };

        return (
            <View>
                <Image style={iconStyle} source={require("../../assets/cat_100.png")} />
            </View>
        )
    }
}

Character.propTypes = {
    size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }),
    xPos: PropTypes.number,
    yPos: PropTypes.number,
    window: PropTypes.object
};

export default Character;