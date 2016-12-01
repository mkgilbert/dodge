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

class Enemy extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // check collision
        const { size, position, charSize, charPosition } = this.props;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let style = {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: 'red',
            position: 'absolute',
            top: this.props.position.y,
            left: this.props.position.x
        };
        return (
            <View style={style} />
        );
    }
}

const styles = StyleSheet.create({

});

Enemy.propTypes = {
    size: PropTypes.number.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    charSize: PropTypes.number.isRequired,
    charPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    onCollision: PropTypes.func.isRequired
};

export default Enemy;
