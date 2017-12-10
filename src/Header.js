import React from 'react';
import titleImage from './img/logo.png';

import Help from './Help';

import styled, { keyframes } from 'styled-components';


const HeaderWrapper = styled.div`
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
    max-width: 600px;
    animation: ${bobble} 2s ease-in-out infinite;
    justify-self: center;
    z-index: 100;
`;

const Header = () => (
    <HeaderWrapper>
        <Help />
        <TitleImage src={titleImage} />
    </HeaderWrapper>
);

export default Header;
