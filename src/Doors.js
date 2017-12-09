import React from 'react';
import Door from './Door';
import styled from 'styled-components';
import Controls from './Controls';
import background from './stone-bg.png';

import './Doors.css';


const DoorContainer = styled.div`
    display: grid;
    height: calc(90vh);
    min-height: 500px;
    padding-top: calc(20vh);
    grid-template-columns: repeat(3, auto);
    justify-items: center;
    align-content: end;
    background: 
        radial-gradient(transparent, black),
        url(${background});

    &:after {
        grid-column: 1 / span 3;
        content: '';
        width: calc(100vw);
        height: calc(20vh);
        background:
            radial-gradient(transparent, black),
            linear-gradient(rgba(100,100,100,0.66), black);
    }

`;

const Doors = (props) => {
    const renderDoors = props.doors.map((door, index) => (
        <Door key={index}
            isOpen={door.isOpen}
            hasPrize={door.hasPrize}
            picked={door.picked}
            oldPick={door.oldPick}
        />
    ));
    return (
        <DoorContainer>

            {renderDoors}
        </DoorContainer>
        
    );
};

export default Doors;
