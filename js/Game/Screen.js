/**
 * Created by mkg on 11/30/2016.
 */
import React, { Component } from 'react';
import { View } from 'react-native';

const style = (window) => {
    console.log("width: " + window.width + " height: " + window.height);
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
            <View style={style(this.props.window)}>
                { this.props.children }
            </View>
        );
    }
}

export default Screen;