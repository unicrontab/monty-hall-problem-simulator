import React from 'react';
import styled from 'styled-components';

import question from './img/question.png';

const HelpImage = styled.img`
    max-width: 20px;
`;

const HelpContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    transform: translate( calc(-2vw), calc(2vh));
    transition: transform 0.2s ease-in-out;
    
    &:hover {
        transform: scale(1.8) translate( calc(-2vw), calc(2vh));
    }
`;

const Help = () => (
    <HelpContainer>
        <a href="https://en.wikipedia.org/wiki/Monty_Hall_problem">
            <HelpImage src={question} />
        </a>
    </HelpContainer>
);

export default Help;
