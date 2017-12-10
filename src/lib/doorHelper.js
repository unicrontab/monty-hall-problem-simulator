import * as R from 'ramda';

export const random = () => Math.floor(Math.random() * 3);
export const binary = () => Math.floor(Math.random() * 2);

const createDoor = (id) => ({
    id,
    isOpen: false,
    hasPrize: false,
    picked: false,
});

export const createDoors = R.times(createDoor, 3);


export const closeDoors = doors => doors.map(door => {
    const newDoor = R.assoc('isOpen', false, door);
    return newDoor;
});

export const openDoors = doors => doors.map(door => {
    const newDoor = R.assoc('isOpen', true, door);
    return newDoor;
});

export const removePrizes = doors => doors.map(door => {
    const newDoor = R.assoc('hasPrize', false, door);
    return newDoor;
});

export const resetPicked = doors => doors.map(door => {
    const newDoor = R.assoc('picked', false, door);
    return newDoor;
});

export const resetOldPick = doors => doors.map(door => {
    const newDoor = R.assoc('oldPick', false, door);
    return newDoor;
});

export const setPrize = doors =>
    R.adjust(door => R.assoc('hasPrize', true, door), random())(doors);

export const resetDoors = R.pipe(
    removePrizes,
    closeDoors,
    resetPicked,
    resetOldPick,
);

export const openDoor = (pick, doors) =>
    R.adjust(door => R.assoc('isOpen', true, door), pick)(doors);

export const openPickedDoor = doors => {
    return doors.map((door, index) => {
        const newDoor = Object.assign({}, door);
        if (newDoor.picked) newDoor.isOpen = true;
        return newDoor;
    });
};

export const openExtraDoor = doors => {
    const extraDoor = doors.find(door => !door.picked && !door.hasPrize).id;
    return openDoor(extraDoor, doors);
};

export const switchDoors = doors => {
    const unOpenedDoor = doors.find(door => !door.isOpen && !door.picked);
    const pickedDoor = doors.find(door => door.picked);
    const newDoorsWithPick = R.adjust(door => R.assoc('picked', true, door), unOpenedDoor.id)(doors);
    const doorsWithOldDoor = R.adjust(door => R.assoc('oldPick', true, door), pickedDoor.id)(newDoorsWithPick);
    const newSwitchedDoors = R.adjust(door => R.assoc('picked', false, door), pickedDoor.id)(doorsWithOldDoor);

    return newSwitchedDoors;
};

export const keepAndOpenSecondDoor = R.curry((pick, doors) => {
    const closedDoors = doors.filter(door => door.isClosed);
    const secondPick = closedDoors[binary()].id;
    return openDoor(secondPick, doors);
});

export const pickFirstDoor = doors => {
    const pick = random();
    return doors.map((door, index) => {
        const newDoor = Object.assign({}, door);
        newDoor.picked = index === pick;
        return newDoor;
    });
};

const checkDoorForWin = door => door.picked && door.hasPrize;

export const didWin = doors => {
    const won = R.filter(checkDoorForWin)(doors);
    const winResult = Boolean(won.length);
    return winResult;
};

export const checkForPrize = (pick, doors) => doors[pick].hasPrize;

export const runSimulation = R.pipe(
    resetDoors,
    setPrize,
    pickFirstDoor,
    openExtraDoor,
    switchDoors,
    openPickedDoor,
);
