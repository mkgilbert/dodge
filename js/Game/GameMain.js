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
import Character from './Character';
import Enemy from './Enemy';
import Screen from './Screen';

var window = Dimensions.get('window');

const moveStep = 20;

export class GameMain extends Component {


    constructor(props) {
        super(props);

        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);
        this.difficulty = this.props.route.difficulty;
        this.gameWindow = {
            width: window.width,
            height: Math.floor(window.height * 0.80)
        };
        this.state = {
            timeUsed: 0,
            characterXPos: Math.floor(window.width / 2),
            characterYPos: this.gameWindow.height - 75,
            enemyPositions: [{key: 0, x: Math.floor(window.width/2), y: 0}, {key: 1, x: 50, y: 0}],
            enemySpeed: 5,
            enemyIndex: 0,
            enemiesActive: 1,
            enemySize: 35,
            charSize: 50
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
        this.startGame();
    }

    /**
     * Called before the component unmounts - Stops listening for back button presses
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
        clearInterval(this.timeInterval);
        clearInterval(this.enemyInterval);
        //clearInterval(this.gameInterval);
    }

    createEnemy(size, xPos) {
        this.setState({
            enemyIndex: this.state.enemyIndex + 1
        });

        let enemy = { key: this.state.enemyIndex };
        enemy.x = this.state.characterXPos;
        enemy.y = 0;

        return enemy;
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

    onPlayerCollision() {
        console.log("Player Collision");
    }



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

    placeEnemy() {
        // put enemy on the screen at the same x position as the player
    }

    startGame() {
        this.enemyInterval = setInterval(this.updateEnemyPositions.bind(this), 100);
        this.timeInterval = setInterval(this.updateGame.bind(this), 1000);
        //this.gameInterval = setInterval(this.updateEnemiesActive, 250);
    }

    updateGame() {
        // update score and time ... ?
        // increment max active enemies and speed
        if (!this.state.enemyPositions) {   // means all enemies are gone
            console.log("pushing to results...")
            this.props.navigator.push({
                id: "results"
            });
        }
        console.log("updating game");
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

    updateEnemyPositions() {
        // move enemies based on speed
        let enemyPos = clone(this.state.enemyPositions);
        let charPos = {
            x: this.state.characterXPos,
            y: this.state.characterYPos
        };

        this.setState({
            enemyPositions: enemyPos.filter(enemy => !enemy.remove).map(enemy => {
                if (enemy.y > this.gameWindow.height) {
                    enemy.remove = true;
                    return enemy;
                }

                enemy.y += this.state.enemySpeed;
                return enemy;
            })
        });
    }

    updateEnemiesActive() {
        // check the current number of enemies and place a new enemy if need be
    }

    render() {
        // TODO: move this out of render
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

        let charPos = {
            x: this.state.characterXPos,
            y: this.state.characterYPos
        };


        if (!this.state.enemyPositions || this.state.enemyPositions.length === 0) {
            return(
                <View><Text>END</Text></View>
            );
        }

        let enemyPos = clone(this.state.enemyPositions);

        return (
                <View style={styles.container}>
                    <Text style={timerStyle}>{this.timeToString()}</Text>
                    <Screen window={this.gameWindow}>
                        <Character
                            yPos={charPos.y}
                            xPos={charPos.x}
                            size={this.state.charSize}
                        />
                        {
                            this.state.enemyPositions.map(enemy =>
                                <Enemy
                                    key={enemy.key}
                                    size={this.state.enemySize}
                                    position={enemyPos[0]}
                                    charSize={this.state.charSize}
                                    charPosition={charPos}
                                    onCollision={this.onPlayerCollision}
                                />
                            )
                        }

                    </Screen>
                    <View style={styles.buttons}>
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
                    </View>

                </View>
        );
    }


}

GameMain.propTypes = {
    onBack: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    leftButton: {
        width: 75,
        height: 75,
        backgroundColor: 'blue'
    },
    rightButton: {
        width: 75,
        height: 75,
        backgroundColor: 'blue'
    },
    character: {
        position: 'absolute',
        bottom: 0
    }

});

export default GameMain;