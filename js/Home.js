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
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnagramGuessBox from './Anagrams/AnagramGuessBox';
import AnagramDisplay from './Anagrams/AnagramDisplay';


/**
 * Represents the game home screen
 */
export class Home extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Called when the component has completed mounting - Listens for back button presses to exit the app
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", BackAndroid.exitApp);
    }

    /**
     * Called before the component unmounts - Stops listening for back button presses
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", BackAndroid.exitApp);
    }

    /**
     * Called when the about button has been pressed
     */
    onScoresClicked() {
        this.props.onScores();
    }
    /**
     * Called when the Challenges button has been pressed
     */
    onStartClicked() {
        this.props.onStart();
    }

    /**
     * Render the component
     */
    render() {
        // Render the home page
        return (
            <View style={styles.container}>

                <View style={styles.toolbar}>
                    <Text style={styles.toolbarText}>DODGE</Text>
                    <Text style={styles.centerText}>Your standard run of the mill dodging game</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableNativeFeedback onPress={this.onScoresClicked.bind(this)}>
                        <View style={styles.wideButton}>
                            <Text style={styles.wideButtonText}>Scoreboard</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.onStartClicked.bind(this)}>
                        <View style={styles.wideButton}>
                            <Text style={styles.wideButtonText}>Start</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

Home.propTypes = {
    onScores: React.PropTypes.func.isRequired,
    onStart: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        height: 150,
        marginBottom: 30,
        backgroundColor: '#1FB6FF',
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 15
    },
    toolbarText: {
        fontSize: 50
    },
    wideButton: {
        backgroundColor: '#1FB6FF',
        margin: 10,
        marginTop: 0,
        marginBottom: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerText: {
        textAlign: "center",
        fontSize: 20
    },
    wideButtonText: {
        fontSize: 20
    },
    buttons: {
        flex: 1,
        justifyContent: "center"
    }
});

export { AnagramDisplay, AnagramGuessBox };
export default Home;