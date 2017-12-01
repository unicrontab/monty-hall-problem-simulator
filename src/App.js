import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {
    resetDoors,
    closeDoors,
    openDoors,
    keepAndOpenSecondDoor,
    openPickedDoor,
    openDoor,
    setPrize,
    didWin,
    random,
    switchDoors,
    pickFirstDoor,
    openExtraDoor,
} from './lib/doorHelper';
import Doors from './Doors';
import Controls from './Controls';
import * as R from 'ramda';
import { primary, secondary, white } from './theme';

import './App.css';
const log = x => {
    console.log(x);
    return x;
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simRun: 0,
            firstGuess: 0,
            switchTotal: 0,
            switchWin: 0,
            switchLost: 0,
            won: false,
            concurrentRuns: 1,
            doors: [
                {
                    id: 0,
                    isOpen: false,
                    hasPrize: false,
                    picked: false,
                },
                {
                    id: 1,
                    isOpen: false,
                    hasPrize: false,
                    picked: false,
                },
                {
                    id: 2,
                    isOpen: false,
                    hasPrize: false,
                    picked: false,
                },
            ],
        };
        this.run = (doors) => {
            console.log('Run:', this.state.simRun);
            const doorState = R.pipe(
                resetDoors,
                setPrize,
                pickFirstDoor,
                openExtraDoor,
                switchDoors,
            )(doors);

            const wonSwitching = didWin(doorState);
            if (wonSwitching) {
                this.setState({
                    simRun: this.state.simRun + 1,
                    switchWin: this.state.switchWin + 1,
                    doors: doorState,
                });
            } else {
                this.setState({
                    simRun: this.state.simRun + 1,
                    switchLost: this.state.switchLost + 1,
                    doors: doorState,
                });
            }
        };
        this.updateRunCountHandler = (event) => {
            this.setState({ concurrentRuns: event.target.value });
        };
        this.reset = () => {
            this.setState({ doors: resetDoors(this.state.doors) });
        };
        this.stay = () => {
            this.setState({ doors: openDoors(this.state.doors) });
        };
        this.switch = () => {
            this.setState({ doors: switchDoors(this.state.doors) });
        };
    }

    render() {
        const doors = this.state.doors;
        const won = didWin(doors);
        const wonOutput = won ? ': )' : ': (';
        const wonOutputColor = won ? 'green' : 'red';
        const switchPercent = Math.round((this.state.switchWin / this.state.simRun) * 100);
        const stayPercent = Math.round((this.state.switchLost / this.state.simRun) * 100);

        return (
            <MuiThemeProvider>
                <div className="App">
                    <header className="App-header">
                        <h1 
                            style={{ color: white }}
                            className="App-title">Monty Hall Problem Simulator</h1>
                        <p> <a 
                            style={{ color: white, fontStyle: 'none' }}
                            href="https://en.wikipedia.org/wiki/Monty_Hall_problem">wiki</a> </p>
                    </header>
                    <Doors doors={doors}/>
                    <h3 
                        className='won-output'
                        style={{
                            color: wonOutputColor,
                        }}> {wonOutput} </h3>
                    <Controls
                        doors={doors}
                        run={this.run}
                        runCount={this.state.simRun}
                    />

                    <p><span className='picked-legend' /><i>Switch:  {this.state.switchWin} - {switchPercent}%</i></p>
                    <p><span className='oldPick-legend' /><i>Stay: {this.state.switchLost} - {stayPercent}%</i></p>
                    <p></p>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
