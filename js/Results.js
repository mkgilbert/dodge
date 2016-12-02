/**
 * @providesModule
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Displays the about screen in the calculator app
 */
export class Results extends Component {

    constructor(props) {
        super(props);
        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);
    }

    /**
     * Called when the component has completed mounting - Start listening for back button presses (to exit the screen)
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    /**
     * Called before the component unmounts - Stop listening for back button presses (to exit the screen)
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    /**
     * Called when the back button has been pressed: either hardware back or the back button on the toolbar
     * @returns {boolean}
     */
    onHomeClicked() {
        this.props.navigator.popToTop();
        return true;
    }

    onBackClicked() {
        this.onHomeClicked();
    }

    /**
     * Called when user wants to start another game with a different challenge
     * @returns {boolean}
     */
    onPlayAgainClicked() {
        this.props.navigator.popN(2);
        return true;
    }

    /**
     * Render the component
     */
    render() {
        let score = this.props.route.score;
        let time = this.props.route.time;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.gameOver}>Game Over!</Text>
                        <Text style={styles.text}>Your Score:</Text>
                        <Text style={styles.score}>{score}</Text>
                        <Text style={styles.text}>Your Time:</Text>
                        <Text style={styles.score}>{time}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableNativeFeedback onPress={this.onHomeClicked.bind(this)}>
                            <View style={styles.wideButton}>
                                <Text style={styles.wideButtonText}>Back to Home</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.onPlayAgainClicked.bind(this)}>
                            <View style={styles.wideButton}>
                                <Text style={styles.wideButtonText}>Play Again</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    gameOver: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 60,
        alignSelf: 'center'
    },
    text: {
        paddingLeft: 20,
        fontSize: 20,
        backgroundColor: '#81D4FA'
    },
    content: {
        flex: 1,
        justifyContent: "space-between"
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        flexDirection: "row"
    },
    wideButton: {
        backgroundColor: '#01579B',
        margin: 10,
        marginTop: 0,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wideButtonText: {
        fontSize: 20,
        color: 'white'
    },
    buttons: {
        marginBottom: 0
    },
    score: {
        fontSize: 50,
        textAlign: "center"
    }
});

export default Results;
