/**
 * Created by mkg on 11/28/2016.
 */

/**
 * @providesModule
 */

import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    TouchableHighlight,
    StyleSheet,
    Text,
    TextInput,
    View,
    BackAndroid,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import clone from 'clone';
import { Loop, Stage, World, Body } from 'react-game-kit/native';
import Matter from 'matter-js';

import Character from './Character';

var window = Dimensions.get('window');

const moveStep = 20;

export class GameScreen extends Component {


    constructor(props) {
        super(props);

        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);
        this.difficulty = this.props.route.difficulty;

        this.state = {
            timeUsed: 0,
            characterXPos: Math.floor(window.width / 2)
        };
    }

    /**
     * Called when the component has completed mounting - Listens for back button presses to exit the app
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
        window = Dimensions.get('window');
        this.timeInterval = setInterval(() => {
            this.setState({timeUsed: this.state.timeUsed + 1})
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
        if (this.state.timeUsed < 0)
            return 0;
        let t = this.state.timeUsed;
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

    physicsInit = (engine) => {
        const ground = Matter.Bodies.rectangle(
            0, window.height-20,
            window.width, 100,
            {
                isStatic: true,
            },
        );

        Matter.World.addBody(engine.world, ground);
    };

    onLeftPressed() {
        let new_x = this.state.characterXPos - moveStep;
        if (new_x < 0)
            new_x = 0;

        this.setState({
            characterXPos: new_x
        });
    }

    onRightPressed() {
        let new_x = this.state.characterXPos;
        if (new_x < window.width - 30)
            new_x += moveStep;

        this.setState({
            characterXPos: new_x
        });
    }

    render() {
        let timerStyle = {
            textAlign: "right",
            fontSize: 20,
            margin: 5,
            color: "green"
        };

        if (this.state.timeUsed > 60 && this.state.timeUsed < 120) {
            timerStyle.color = "#cc0"
        } else if (this.state.timeUsed > 120) {
            timerStyle.color = "red";
        }

        /*return (
            <View style={styles.container}>
                <Text style={timerStyle}>{this.timeToString()}</Text>
                <Character />
            </View>
        );*/
        return (
            <Loop>
                <Stage height={window.height} width={window.width}>
                    <World
                        onInit={this.physicsInit}>
                        <TouchableHighlight
                            onPress={this.onLeftPressed.bind(this)}
                            style={styles.leftButton}>
                            <Text style={{color: 'white'}}>Left</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this.onRightPressed.bind(this)}
                            style={styles.rightButton}>
                            <Text style={{color: 'white'}}>Right</Text>
                        </TouchableHighlight>
                        <Character x_pos={this.state.characterXPos} window={window} />
                        <Text style={timerStyle}>{this.timeToString()}</Text>
                    </World>
                </Stage>
            </Loop>
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
    leftButton: {
        position: 'absolute',
        bottom: 25,
        width: 75,
        height: 75,
        backgroundColor: 'blue'
    },
    rightButton: {
        position: 'absolute',
        bottom: 25,
        right: 0,
        width: 75,
        height: 75,
        backgroundColor: 'blue'
    },
    character: {
        position: 'absolute',
        bottom: 0
    }

});

export default GameScreen;