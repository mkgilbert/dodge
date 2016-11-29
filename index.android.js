/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, AppRegistry, Navigator } from 'react-native';
import Home from './js/Home';
import About from './js/About';
import Difficulty from './js/Difficulty';
import GameScreen from './js/Game/GameScreen';
import Results from './js/Results';

/**
 * Represents the entire app
 */
class dodge extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Called when a screen should be pushed on to the navigation stack
     * @param screenName - The id of the screen
     * @param navigator - The navigator
     */
    onScreenPush(screenName, navigator) {
        navigator.push({
            id: screenName
        });
    }

    /**
     * Called when a screen should be popped from the navigation stack
     * @param navigator - The navigator
     */
    onScreenPop(navigator) {
        navigator.pop();
    }

    /**
     * Render the app
     */
    render() {
        // Simply divert the rendering to renderScene()
        return (
            <Navigator
                initialRoute={{id: 'home'}}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }

    /**
     * Decide which root level component to render depending on which screen is currently being accessed
     * @param route - The route to render
     * @param navigator - The navigator
     */
    renderScene(route, navigator) {
        switch (route.id) {
            // Render the calculator
            case "home":
                return (
                    <Home
                        onScores={this.onScreenPush.bind(this, "scores", navigator)}
                        onStart={this.onScreenPush.bind(this, "start", navigator)}
                    />
                );
            // Render the about screen

            // Render Challenge choice screen
            case "start":
                return (
                    <Difficulty
                        route={route}
                        navigator={navigator}
                        onBack={this.onScreenPop.bind(this, navigator)}
                    />
                );

            case "game":
                return (
                    <GameScreen
                        route={route}
                        navigator={navigator}
                        onBack={this.onScreenPop.bind(this, navigator)}
                    />
                );

            case "results":
                return (
                    <Results route={route} navigator={navigator}/>
                );
        }
    }
}

AppRegistry.registerComponent('dodge', () => dodge);
