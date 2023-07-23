import { store } from '../data/state';
import { driveCar, startEngine, stopEngine } from '../data/api';
import { RacingCar } from '../types/interfaces';
import renderAnimation from './renderAnimation';
import { getDistance } from '../utils/utils';

async function startDriving(id: number) {
    const track = document.querySelector(`[data-track="${id}"]`) as HTMLDivElement;
    const startButton = document.querySelector(`[data-start="${id}"]`) as HTMLButtonElement;
    const stopButton = document.querySelector(`[data-stop="${id}"]`) as HTMLButtonElement;
    startButton.disabled = true;
    const { distance, velocity } = await startEngine(id);
    const time = Math.round(distance / velocity);
    const car = document.querySelector(`[data-car="${id}"]`) as HTMLElement;
    const flag = document.querySelector(`[data-flag="${id}"]`) as HTMLElement;
    const htmlDistance = Math.floor(getDistance(car, flag)) - 20;
    store.animation[id] = renderAnimation(car, htmlDistance, time);
    stopButton.disabled = false;
    let { success } = await driveCar(id);
    const animationId = store.animation[id]?.id as number;
    if (!success) {
        window.cancelAnimationFrame(animationId);
        track.classList.add('stop');
    }
    if (stopButton.disabled) {
        success = false;
    }
    const res: RacingCar = {
        success,
        id,
        time,
    };
    return res;
}

async function stopDriving(id: number) {
    const track = document.querySelector(`[data-track="${id}"]`) as HTMLDivElement;
    const startButton = document.querySelector(`[data-start="${id}"]`) as HTMLButtonElement;
    const stopButton = document.querySelector(`[data-stop="${id}"]`) as HTMLButtonElement;
    const raceButton = document.querySelector('.race-button') as HTMLButtonElement;
    const startButtons = [...document.querySelectorAll('.start-button')] as HTMLButtonElement[];
    stopButton.disabled = true;
    await stopEngine(id);
    startButton.disabled = false;
    const car = document.querySelector(`[data-car="${id}"]`) as HTMLElement;
    car.style.transform = 'translateX(0)';
    const animationId = store.animation[id]?.id as number;
    if (store.animation[id]) window.cancelAnimationFrame(animationId);
    setTimeout(() => {
        track.classList.remove('stop');
    }, 200);
    if (startButtons.some((button) => button.disabled)) return;
    raceButton.disabled = false;
}

export { startDriving, stopDriving };
