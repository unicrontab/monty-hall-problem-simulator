import React from 'react';
import Door from './Door';
import styled from 'styled-components';

const DoorContainer = styled.div`
    display: grid;
    padding-top: calc(30vh);
    grid-template-columns: repeat(3, auto);
    justify-items: center;
    align-content: end;

    &:after {
        grid-column: 1 / span 3;
        content: '';
        width: calc(100vw);
        height: calc(100vh);
        background:
            radial-gradient(transparent, black),
            linear-gradient(rgba(0,0,0,0.3), black);
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
