import React from 'react';
import Door from './Door';

import './Doors.css';

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
        <div className="doorContainer">
            {renderDoors}
        </div>
    );
};

export default Doors;
