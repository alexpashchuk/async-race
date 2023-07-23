import { stopDriving } from './driveController';
import { store } from '../data/state';

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

export { resetRace };
