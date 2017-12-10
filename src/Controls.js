import React, { Component } from 'react';
import styled from 'styled-components';
// import * as R from 'ramda';

import Notification from './Notification';
import runButton from './img/run.png';
import runButtonHover from './img/runHover.png';

const ControlContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1px auto;
    justify-content: center;
    padding-top: calc(10vh);
`;

const RunButton = styled.img`
    grid-column: 2;
    width: calc(20vw);
    max-width: 60px;
    justify-self: center;
    z-index: 50;
    transform: translateY(calc(-1vh));

    &:active {
        transform: scale(1.2);
    }
`;

const ProgressContainer = styled.div`
    height: 20px;
    width: calc(30vw);
    border: solid 4px black;
    border-radius: 20px;
    overflow: hidden;
    border-bottom: solid 30px rgba(0,0,0,0.54);
    display: grid;
    background-color: rgba(0,0,0,0.54);
`;

const ProgressText = styled.span`
    position: absolute;
    transform: translateX(calc(14vw));
    font-family: monospace;
    font-weight: 900;
    color: rgba(255,255,255,0.8);
`;

const Label = styled.span`
    position: absolute;
    color: rgba(255,255,255,0.54);
    font-family: monospace;
    transform-origin: 50% 50%;
    transform: translate(calc(13vw), 25px);

    @media(max-width: 500px) {
        transform: translate(calc(5vw), 25px);
    }
`;

const Progress = styled.div`
    background-color: rgba(70, 170, 0, 1);
    height: 20px;
`;

const ProgressBar = props => (
    <ProgressContainer style={{ justifyItems: props.align }} >
        {props.width > -1 && <ProgressText>{props.width}%</ProgressText>}
        <Label>{props.label}</Label>
        <Progress style={{ width: `${props.width}%` }} />
    </ProgressContainer>
);


class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonSrc: runButton,
            notifications: [],
        };
    }
    run = () => {
        this.props.run(this.props.doors);
        // const oldNotifications = R.takeLast(1, this.state.notifications);
        // TODO: Garbage Collect this.state.notifications :(
        // TODO: Need to move out of here. Only renders 2nd+ notification.
        const newNotification = (
            <Notification
                key={this.state.notifications.length + 1}
                won={this.props.won}
                switchWin={this.props.switchWin}
                switchLost={this.props.switchLost}
            />
        );
        this.setState(prevState => ({
            notifications: [...prevState.notifications, newNotification], 
        }));
    }

    handleMouseOver = () => {
        this.setState({ buttonSrc: runButtonHover });
    }

    handleMouseOut = () => {
        this.setState({ buttonSrc: runButton });
    }

    render() {
        console.log(this.state.notifications.length);
        const switchPercent = Math.round((this.props.switchWin / this.props.runCount) * 100);
        const stayPercent = Math.round((this.props.switchLost / this.props.runCount) * 100);
        return (
            <ControlContainer>
                {this.state.notifications}
                <ProgressBar label="staying" align="right" width={stayPercent} />
                <RunButton
                    src={this.state.buttonSrc}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                    label={`run (${this.props.runCount})`}
                    primary={true}
                    onClick={this.run}
                />
                <ProgressBar label="switching" align="left" width={switchPercent} />
            </ControlContainer>
        );
    }
}

export default Controls;
