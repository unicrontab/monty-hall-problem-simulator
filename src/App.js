import React, { Component } from 'react';
import styled from 'styled-components';


import Header from './Header';
import Controls from './Controls';
import Doors from './Doors';
import {
    createDoors,
    didWin,
    runSimulation,
} from './lib/doorHelper';

const AppWrapper = styled.div`
    display: grid;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simRun: 0,
            switchWin: 0,
            switchLost: 0,
            doors: createDoors,
        };

        this.run = (oldDoors) => {
            const doors = runSimulation(oldDoors);
            const won = didWin(doors);
            const doorChanges = won
                ? { switchWin: this.state.switchWin + 1 }
                : { switchLost: this.state.switchLost + 1 };

            this.setState({ 
                doors,
                won,
                simRun: this.state.simRun + 1,
                ...doorChanges,
            });
        };
    }

    render() {
        return (
            <AppWrapper>
                <Header/>
                <Controls
                    doors={this.state.doors}
                    runCount={this.state.simRun}
                    run={this.run}
                    switchWin={this.state.switchWin}
                    switchLost={this.state.switchLost}
                    won={this.state.won}
                />
                <Doors doors={this.state.doors} />
            </AppWrapper>
        );
    }
}

export default App;
