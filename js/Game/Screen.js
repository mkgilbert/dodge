/**
 * Created by mkg on 11/30/2016.
 */
import React, { Component } from 'react';
import { View, Image } from 'react-native';

const style = (window) => {
    return {
        backgroundColor: 'grey',
        width: window.width,
        height: window.height,
        overflow: 'hidden',
        marginBottom: 20
    };
};

export class Screen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Image source={require('../../assets/sky_skinny.png')} style={style(this.props.window)}>
                { this.props.children }
            </Image>
        );
    }
}

export default Screen;