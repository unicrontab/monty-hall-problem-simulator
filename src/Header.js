import React from 'react';
import titleImage from './logo.png';
import question from './question.png';
import Controls from './Controls';

import styled, { keyframes } from 'styled-components';


const HeaderWrapper = styled.div`
    position: absolute;
    width: calc(100vw);
    justify-content: center;
    display: grid;
`;

const bobble = keyframes`
    0%, 100% {
        transform: translateY(calc(-1vh));
    }
    50% {
        transform: translateY(calc(1vh));
    }
`;

const TitleImage = styled.img`
    padding-top: calc(10vh);
    padding-bottom: calc(2vh);
    width: calc(80vw);
    max-width: 800px;
    animation: ${bobble} 2s ease-in-out infinite;
    justify-self: center;
`;


const Help = styled.img`
    max-width: 20px;

`;

const HelpContainer = styled.div`
    width: calc(5vw);
    position: absolute;
    right: 0;
    top: 0;
    transform: translate( calc(-2vw), calc(2vh));
    transition: transform 0.2s ease-in-out;
    
    &:hover {
        transform: scale(1.8) translate( calc(-2vw), calc(2vh));
    }
`;

const Header = (props) => (
    <HeaderWrapper>
        <HelpContainer>
            <a href="https://en.wikipedia.org/wiki/Monty_Hall_problem">
                <Help src={question} />
            </a>
        </HelpContainer>
        <TitleImage src={titleImage} />
        <Controls
            doors={props.doors}
            runCount={props.runCount}
            run={props.run}
            switchWin={props.switchWin}
            switchLost={props.switchLost}
        />
    </HeaderWrapper>
);

export default Header;
