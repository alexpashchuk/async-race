import { store } from '../data/state';
import { startDriving, stopDriving } from './driveController';
import { saveWinner } from '../data/api';
import { Car, RacingCar, WinnerItems } from '../types/interfaces';

async function startRace(e: Event) {
    const messageWrapper = document.querySelector('.message-win') as HTMLElement;
    const message = document.querySelector('.message') as HTMLElement;
    const winnersButton = document.querySelector('.winners-button') as HTMLButtonElement;
    const target = e.target as HTMLButtonElement;
    target.disabled = true;
    winnersButton.disabled = true;
    const winner = (await renderRace(startDriving)) as WinnerItems;
    await saveWinner(winner);
    store.winnersCount = +1;
    message.innerHTML = `THE WINNER IS ${winner.car.name} (${winner.time} SEC)!`;
    messageWrapper.classList.add('visible');
    const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;
    resetButton.disabled = false;
    winnersButton.disabled = false;
}

async function resetRace(e: Event) {
    const target = e.target as HTMLButtonElement;
    target.disabled = true;
    store.cars.map((car) => {
        const carID = car.id as number;
        return stopDriving(carID);
    });
    const message = document.querySelector('.message-win') as HTMLElement;
    message.classList.toggle('visible', false);
    const raceButton = document.querySelector('.race-button') as HTMLButtonElement;
    raceButton.disabled = false;
}

async function renderRace(action: (id: number) => Promise<RacingCar>): Promise<WinnerItems> {
    const promises = store.cars.map((car) => {
        const carID = car.id as number;
        return action(carID);
    });
    const carIDs = store.cars.map((car) => car.id) as number[];
    const winner: WinnerItems = await raceAllCars(promises, carIDs);
    return winner;
}

export async function raceAllCars(promises: Promise<RacingCar>[], ids: number[]): Promise<WinnerItems> {
    const { success, id, time } = await Promise.race(promises);
    if (!success) {
        const failedIndex = ids.findIndex((i) => i === id);
        const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
        const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
        if (restIds.length === 0) {
            const messageWrapper = document.querySelector('.message-win') as HTMLElement;
            const message = document.querySelector('.message') as HTMLElement;
            message.innerHTML = 'Race Finished! All cars stopped';
            messageWrapper.classList.add('visible');
            const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;
            resetButton.disabled = false;
        }
        return raceAllCars(restPromises, restIds);
    }
    const winnerCar = store.cars.find((car) => car.id === id) as Car;
    const winner = { car: winnerCar, time: +(time / 1000).toFixed(2) };
    return winner;
}

export { startRace, resetRace };
