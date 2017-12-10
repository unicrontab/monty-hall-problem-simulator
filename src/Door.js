import React, { Component } from 'react';
import doorSpriteSheet from './img/doors.png';
import doorPrizeSpriteSheet from './img/doorPrize.png';
import Spritesheet from './lib/Spritesheet';
import pointer from './img/pointer.png';

import styled, { keyframes } from 'styled-components';

const bobble = keyframes`
    0%, 100% {
        transform: translateY(calc(-1vh));
    }
    50% {
        transform: translateY(calc(1vh));
    }
`;

const DoorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const Pointer = styled.img`
    color: rgba(255,255,255,54);
    width: 40px;
    align-self: center;
`;

const OldPointer = Pointer.extend`
    z-index: 30;
    opacity: 0.5;
`;

const PointerLabel = styled.div`
    display: grid;
    color: rgba(255,255,255,0.87);
    justify-items: center;
    z-index: 30;
    animation: ${bobble} 2s ease-in-out infinite;
`;

class Door extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
        };
    }

    doorStatus = (first, second) => {
        const firstText = first ? 'First Choice' : null;
        const secondText = second ? 'Second Choice' : null;
        return (<p>{firstText}{secondText}</p>);
    }

    resetDoors = () => {
        if (this.spritesheetInstance)
            this.spritesheetInstance.goToAndPause(0);
    };

    renderPointer = (picked, oldPick) => {
        if (picked) return (
            <PointerLabel>
                <div>switching</div>
                <Pointer src={pointer} />
            </PointerLabel>
        );
        if (oldPick) return (
            <PointerLabel>
                <div>staying</div>
                <OldPointer src={pointer} />
            </PointerLabel>
        );
    };

    render() {
        this.resetDoors();
        if (this.props.isOpen) this.spritesheetInstance.goToAndPlay(0);
        const prize = this.props.hasPrize;
        const spriteSheet = prize ? doorPrizeSpriteSheet : doorSpriteSheet;

        return (
            <DoorContainer>
                {this.renderPointer(this.props.picked, this.props.oldPick)}

                <Spritesheet
                    image={spriteSheet}
                    style={{ width: 'calc(33vw)', maxWidth: '180px'}}
                    widthFrame={140}
                    heightFrame={140}
                    steps={4}
                    fps={10}
                    startAt={0}
                    endAt={3}
                    autoplay={false}
                    scale={1}
                    getInstance={ spritesheet => {
                        this.spritesheetInstance = spritesheet;
                    }}
                />
            </DoorContainer>
        );
    }
};

export default Door;
