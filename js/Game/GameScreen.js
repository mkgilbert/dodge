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
import Icon from 'react-native-vector-icons/FontAwesome';
import clone from 'clone';

import Character from './Character';

/**
 * Represents the game home screen
 */
export class GameScreen extends Component {

    constructor(props) {
        super(props);

        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);

        this.difficulty = this.props.route.difficulty;

        this.state = {
            timeRemaining: 0
        };
    }

    /**
     * Called when the component has completed mounting - Listens for back button presses to exit the app
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
        this.timeInterval = setInterval(() => {
            this.setState({timeRemaining: this.state.timeRemaining + 1})
        }, 1000);
    }

    /**
     * Called before the component unmounts - Stops listening for back button presses
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
        clearInterval(this.timeInterval);
    }

    /**
     * Deals with the upper left back button
     * @returns {boolean}
     */
    onBackClicked() {
        this.props.onBack();
        return true;
    }


    onResultsClicked() {
        this.props.navigator.push({
            id: "results",
            gameData: this.state.anagrams
        });
        //this.props.onResults();
    }

    timeToString() {
        if (this.state.timeRemaining < 0)
            return 0;
        let t = this.state.timeRemaining;
        let mins = Math.floor(t/60);
        if (mins > 0) {
            t -= mins*60;
            let secs = t;
            if (secs < 10){
                secs = "0" + secs;
            }
            return mins + ":" + secs;
        }
        else {
            return t;
        }
    }

    getPageTitle() {
        let diff = this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
        return diff + " mode";
    }

    /**
     * Render the component
     */
    render() {
        let currentAnagram = null;
        if (this.state.questionNumber >= 0) {
            currentAnagram = this.state.anagrams[this.state.questionNumber].question;
        }

        let timerStyle = {
            textAlign: "right",
            fontSize: 20,
            margin: 5,
            color: "green"
        };

        if (this.state.timeRemaining > 60) {
            timerStyle.color = "#cc0"
        } else if (this.state.timeRemaining > 120) {
            timerStyle.color = "red";
        }

        return (
            <View style={styles.container}>
                <Text style={timerStyle}>{this.timeToString()}</Text>
                <Character />
            </View>
        );
    }
}

GameScreen.propTypes = {
    onBack: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    container2: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        paddingTop: 20
    },
    toolbar: {
        height: 56,
        backgroundColor: '#e9eaed'
    },
    wideButton: {
        backgroundColor: '#1FB6FF',
        margin: 10,
        marginTop: 0,
        marginBottom: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wideButtonText: {
        fontSize: 20
    },
    guessText: {
        marginLeft: 10
    },
    youredone: {
        fontSize: 40,
        textAlign: "center"
    }
});

export default GameScreen;