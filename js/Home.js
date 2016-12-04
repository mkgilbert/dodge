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
    BackAndroid,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    <Image source={require('../assets/logo.jpg')} style={styles.logo} />
                    <Image source={require('../assets/typical.jpg')}  />
                </View>
                <View style={styles.buttons}>
                    <TouchableNativeFeedback onPress={this.onStartClicked.bind(this)}>
                        <View style={styles.wideButton}>
                            <Image source={require('../assets/start_button.jpg')} />
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbar: {
        alignItems: "center"
    },
    toolbarText: {
        fontSize: 50,
        color: 'white'
    },
    logo: {
        maxWidth: 350,
        maxHeight: 175
    },
    typical: {
        width: 275,
        height: 80
    },

    wideButton: {
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
        fontSize: 20,
        color: 'white'
    },
    buttons: {
        margin: 10
    }
});

export default Home;