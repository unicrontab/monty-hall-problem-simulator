import * as DH from './doorHelper';
import * as R from 'ramda';
import { resetDoors } from './doorHelper';
const doors = [
    {
        id: 0,
        isOpen: false,
        hasPrize: false,
        picked: false,
    },
    {
        id: 1,
        isOpen: false,
        hasPrize: false,
        picked: false,
    },
    {
        id: 2,
        isOpen: false,
        hasPrize: false,
        picked: false,
    },
];

const configuredDoors = [
    {
        id: 0,
        isOpen: false,
        hasPrize: false,
        picked: false,
    },
    {
        id: 1,
        isOpen: false,
        hasPrize: true,
        picked: true,
    },
    {
        id: 2,
        isOpen: false,
        hasPrize: false,
        picked: false,
    },
];

it('opens the doors', () => {
    const openedDoors = DH.openDoors(doors);
    expect(openedDoors[0].isOpen).toBe(true);
    expect(openedDoors[1].isOpen).toBe(true);
    expect(openedDoors[2].isOpen).toBe(true);
});

it('picks the first door', () => {
    const doorWithPick = DH.pickFirstDoor(doors);
    const pickedDoor = doorWithPick.find(door => door.picked);
    expect(pickedDoor.picked).toBe(true);
});

it('should detect a win', () => {
    const pickedWinningDoors = R.adjust(
        door => R.assoc('picked', true, door),
        1,
    )(doors);
    const finalWinningDoors = R.adjust(
        door => R.assoc('hasPrize', true, door),
        1,
    )(pickedWinningDoors);
    const won = DH.didWin(finalWinningDoors);
    expect(won).toBe(true);
});

it('should detect a loss', () => {
    const pickedLosingDoors = R.adjust(
        door => R.assoc('picked', true, door),
        1,
    )(doors);
    const finalLosingDoors = R.adjust(
        door => R.assoc('hasPrize', true, door),
        2,
    )(pickedLosingDoors);

    const lose = DH.didWin(finalLosingDoors);
    expect(lose).toBe(false);
});

it('should reset the doors', () => {
    const newResetDoors = resetDoors(configuredDoors);
    expect(newResetDoors[0].isOpen).toBe(false);
    expect(newResetDoors[1].isOpen).toBe(false);
    expect(newResetDoors[1].picked).toBe(false);
    expect(newResetDoors[1].hasPrize).toBe(false);
});

it('should pick one door', () => {
    const doorsWithPick = DH.pickFirstDoor(doors);
    const pick = doorsWithPick.filter(door => door.picked);
    expect(pick.length).toBe(1);
    expect(pick[0].picked).toBe(true);
});

it('should open the extra door', () => {
    const doorsWithPick = DH.openExtraDoor(configuredDoors);
    expect(doorsWithPick[0].isOpen).toBe(true);
    expect(doorsWithPick[1].isOpen).toBe(false);
    expect(doorsWithPick[2].isOpen).toBe(false);
});

it('should set a prize', () => {
    console.log(doors);
    const doorsWithPrize = DH.setPrize(doors);
    console.log(doorsWithPrize);
    const prizeDoor = doorsWithPrize.filter(door => door.hasPrize);
    console.log(prizeDoor);
    expect(prizeDoor.length).toBe(1);
    expect(prizeDoor[0].hasPrize).toBe(true);
});


