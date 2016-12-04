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
    Dimensions,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import clone from 'clone';
import Character from './Character';
import Enemy from './Enemy';
import Screen from './Screen';

var window = Dimensions.get('window');

const moveStep = 25;

export class GameMain extends Component {


    constructor(props) {
        super(props);

        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);
        this.lastCollisionIndex = null;

        let difficulty = this.props.route.difficulty;
        if (difficulty === 'hard') {
            this.maxSpeed = 50;
            this.maxEnemies = 6;
            this.characterSize = {
                width: 40,
                height: 45
            };
            this.maxCollisions = 2;
        } else {
            this.maxSpeed = 30;
            this.maxEnemies = 4;
            this.characterSize = {
                width: 30,
                height: 34
            };
            this.maxCollisions = 4;
        }

        this.gameWindow = {
            width: window.width,
            height: Math.floor(window.height * 0.75)
        };
        this.state = {
            collisions: 0,
            time: 0,
            characterXPos: Math.floor(window.width / 2),
            characterYPos: this.gameWindow.height - 75,
            enemyPositions: [],
            enemySpeed: 5,
            enemyIndex: 0,
            enemiesActive: 1,
            enemySize: 35,
            charSize: this.characterSize,
            score: 0
        };
    }

    /**
     * Called when the component has completed mounting - Listens for back button presses to exit the app
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
        window = Dimensions.get('window');
        this.startGame();
    }

    /**
     * Called before the component unmounts - Stops listening for back button presses
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
        clearInterval(this.timeInterval);
        clearInterval(this.enemyInterval);
        clearInterval(this.gameInterval);
    }

    createEnemy(size, xPos) {
        this.setState({
            enemyIndex: this.state.enemyIndex + 1
        });

        let enemy = { key: this.state.enemyIndex };
        enemy.x = xPos;
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

    onResults() {
        this.props.navigator.push({
            id: "results",
            time: this.timeToString(this.state.time),
            score: this.state.score
        });
        //this.props.onResults();
    }

    onPlayerCollision(index) {
        let collisions = this.state.collisions;
        if (this.lastCollisionIndex !== index) {
            //console.log("Player Collision at index " + index);
            this.lastCollisionIndex = index;
            this.setState({
                collisions: collisions + 1
            });
        }
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
        let enemy = this.createEnemy(this.state.enemySize, this.state.characterXPos);
        this.setState({
            enemyPositions: [...this.state.enemyPositions].concat(enemy)
        });
    }

    resetGame() {
        clearInterval(this.timeInterval);
        clearInterval(this.enemyInterval);
        clearInterval(this.gameInterval);
    }

    startGame() {
        this.enemyInterval = setInterval(this.updateEnemyPositions.bind(this), 50);
        this.timeInterval = setInterval(this.updateGame.bind(this), 1000);
        this.gameInterval = setInterval(this.updateEnemiesActive.bind(this), 250);
    }

    updateGame() {
        // update score and time ... ?
        let time = this.state.time;
        time += 1;
        this.setState({
            time: time
        });

        if (this.state.collisions === this.maxCollisions ||
            this.maxCollisions - this.state.collisions <= 0) {
            //console.log("reached max collisions");
            this.resetGame();
            this.onResults();
        }
        // increment max active enemies and speed
        if (time % 15 === 0) {
            let speed = this.state.enemySpeed;
            if (speed < this.maxSpeed) {
                this.setState({
                    enemySpeed: speed + 1
                });
            }
        }
        if (time % 20 === 0) {
            let enemies = this.state.enemiesActive;
            if (enemies < this.maxEnemies) {
                this.setState({
                    enemiesActive: enemies + 1
                })
            }
        }
    }

    timeToString() {
        if (this.state.time < 0)
            return 0;
        let t = this.state.time;
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
        let score = this.state.score;
        let enemyPos = clone(this.state.enemyPositions);
        this.setState({
            enemyPositions: enemyPos.filter(enemy => !enemy.remove).map(enemy => {
                if (enemy.y > this.gameWindow.height) {
                    score += 10;
                    enemy.remove = true;
                    return enemy;
                }

                enemy.y += this.state.enemySpeed;
                return enemy;
            }),
            score: score
        });
    }

    updateEnemiesActive() {
        // check the current number of enemies and place a new enemy if need be
        if (this.state.enemyPositions.length < this.state.enemiesActive) {
            this.placeEnemy();
        }
    }

    render() {
        let charPos = {
            x: this.state.characterXPos,
            y: this.state.characterYPos
        };

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Score: {this.state.score}</Text>
                    <Text style={styles.headerText}>Time: {this.timeToString()}</Text>
                    <Text style={styles.headerText}>Lives: {this.maxCollisions-this.state.collisions}</Text>
                </View>
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
                                index={enemy.key}
                                size={this.state.enemySize}
                                position={{x: enemy.x, y: enemy.y}}
                                charSize={this.state.charSize}
                                charPosition={charPos}
                                onCollision={this.onPlayerCollision.bind(this)}
                            />
                        )
                    }
                </Screen>
                <View style={styles.row}>
                    <TouchableHighlight
                        onPress={this.onLeftPressed.bind(this)}
                        style={styles.leftButton}>
                        <Image source={require('../../assets/left_button.png')} style={styles.leftButton} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.onRightPressed.bind(this)}
                        style={styles.rightButton}>
                        <Image source={require('../../assets/right_button.jpg')} style={styles.rightButton} />
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
    row: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 30,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 15,
        margin: 5
    },
    leftButton: {
        width: 120,
        height: 80,
        backgroundColor: 'blue'
    },
    rightButton: {
        width: 120,
        height: 80,
        backgroundColor: 'blue'
    },
    character: {
        position: 'absolute',
        bottom: 0
    }

});

export default GameMain;