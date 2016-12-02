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
        // find the midpoints of the enemy and character
        let halfEnemyWidth = Math.floor(size / 2);
        let halfEnemyHeight = Math.floor(size / 2);
        let halfCharWidth = Math.floor(charSize / 2);
        let halfCharHeight = Math.floor(charSize / 2);
        let enemyCenter = {x: position.x + halfEnemyWidth, y: position.y + halfEnemyHeight};
        let charCenter = {x: charPosition.x + halfCharWidth, y: charPosition.y + halfCharHeight};

        // find distance between the midpoints of the enemy and character
        let xDistance = Math.abs(charCenter.x - enemyCenter.x);
        let yDistance = Math.abs(charCenter.y - enemyCenter.y);

        // check if objects are touching
        if (xDistance < (halfEnemyWidth + halfCharWidth) &&
            yDistance < (halfEnemyHeight + halfCharHeight)) {
            this.props.onCollision(this.props.index);
        }
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
