import React, { Component } from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

import Header from './Header';
import Doors from './Doors';
import {
    resetDoors,
    openDoors,
    setPrize,
    didWin,
    switchDoors,
    pickFirstDoor,
    openExtraDoor,
    openPickedDoor,
} from './lib/doorHelper';

const runSimulation = R.pipe(
    resetDoors,
    setPrize,
    pickFirstDoor,
    openExtraDoor,
    switchDoors,
    openPickedDoor,
);

const AppWrapper = styled.div`
    display: grid;
`;

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
        this.run = (oldDoors) => {
            const doors = runSimulation(oldDoors);

            if (didWin(doors)) {
                this.setState({
                    simRun: this.state.simRun + 1,
                    switchWin: this.state.switchWin + 1,
                    doors,
                });
            } else {
                this.setState({
                    simRun: this.state.simRun + 1,
                    switchLost: this.state.switchLost + 1,
                    doors,
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
        return (
            <AppWrapper>
                <Header
                    doors={this.state.doors}
                    runCount={this.state.simRun}
                    run={this.run}
                    switchWin={this.state.switchWin}
                    switchLost={this.state.switchLost} />
                <Doors doors={this.state.doors} />
            </AppWrapper>
        );
    }
}

export default App;
