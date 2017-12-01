import React from 'react';
import './Door.css';

const Door = props => {
    const doorClass = props.isOpen ? 'innerDoorOpen' : 'innerDoorClosed';
    const prize = props.hasPrize ? 'prize' : 'no-prize';
    const picked = props.picked ? 'picked' : null;
    const oldPick = props.oldPick ? 'oldPick' : null;
    const doorStatus = (first, second) => {
        const firstText = first ? 'First Choice' : null;
        const secondText = second ? 'Second Choice' : null;
        return (<p>{firstText}{secondText}</p>);
    };
    return (
        <div className="outerDoor">
            <div className={doorClass}>
                <div className={prize} />
                <div className={picked} />
                <div className={oldPick} />
            </div>
            {doorStatus(oldPick, picked)}
        </div>
    );
};

export default Door;
