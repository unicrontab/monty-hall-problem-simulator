import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { primary, white } from './theme';
import styled from 'styled-components';
import runButton from './run.png';
import runButtonHover from './runHover.png';


const ControlContainer = styled.div`
    display: grid;
    grid-template-columns: auto 50px auto;
    justify-content: stretch;
    padding-top: calc(10vh);
`;

const RunButton = styled.img`
    grid-column: 2;
    width: calc(10vw);
    max-width: 50px;
    justify-self: center;

    &:active {
        transform: scale(1.2);
        transform-origin: center center;
    }
`;

const ProgressContainer = styled.div`
    height: 20px;
    width: calc(30vw);
    border: solid 4px black;
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
)


class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonSrc: runButton,
        };
    }

    run = () => {
        this.props.run(this.props.doors);
    }

    handleMouseOver = () => {
        this.setState({ buttonSrc: runButtonHover });
    }

    handleMouseOut = () => {
        this.setState({ buttonSrc: runButton });
    }

    render() {
        const switchPercent = Math.round((this.props.switchWin / this.props.runCount) * 100);
        const stayPercent = Math.round((this.props.switchLost / this.props.runCount) * 100);

        console.log(JSON.stringify(this.props, null, 4));
        return (
            <ControlContainer>
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
        )
    };
};

export default Controls;
