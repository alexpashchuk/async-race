import { deleteCar, deleteWinner, getCar } from '../data/api';
import { renderGarage, updateGarage } from '../view/garageView';
import { startDriving, stopDriving } from './driveController';
import { resetRace, startRace } from './raceController';
import generateCars from './generateCars';
import renderPagination from './pagination';
import { SortBy } from '../types/enums';
import { renderSorting } from '../view/winnersView';

export default function renderButtonEvents() {
    renderCarButtons();
    renderControlButtons();
    renderSortButtons();
    renderPagination();
}

function renderCarButtons() {
    const garage = document.querySelector('.garage') as HTMLDivElement;
    const updateNameInput = document.querySelector('.update-name') as HTMLInputElement;
    const updateColorInput = document.querySelector('.update-color') as HTMLInputElement;
    const updateButton = document.querySelector('.update-button') as HTMLButtonElement;
    const raceButton = document.querySelector('.race-button') as HTMLButtonElement;

    document.body.addEventListener('click', async (e: Event) => {
        const target = e.target as HTMLElement;

        if (target.classList.contains('select-button')) {
            const carId = Number(target.dataset.select);
            const { name, color, id } = await getCar(carId);
            localStorage.setItem('selectedCar', JSON.stringify({ name, color, id }));
            updateNameInput.value = name;
            updateColorInput.value = color;
            updateNameInput.disabled = false;
            updateColorInput.disabled = false;
            updateButton.disabled = false;
        }

        if (target.classList.contains('remove-button')) {
            const carId = Number(target.dataset.remove);
            await deleteCar(carId);
            await updateGarage();
            garage.innerHTML = renderGarage();
            await deleteWinner(carId);
        }

        if (target.classList.contains('start-button')) {
            raceButton.disabled = true;
            const carId = Number(target.dataset.start);
            startDriving(carId);
        }

        if (target.classList.contains('stop-button')) {
            const carId = Number(target.dataset.stop);
            stopDriving(carId);
        }
    });
}

function renderControlButtons() {
    document.body.addEventListener('click', async (e: Event) => {
        const messageWrapper = document.querySelector('.message-win') as HTMLElement;
        const target = e.target as HTMLElement;
        if (target.classList.contains('race-button')) {
            startRace(e);
        }

        if (target.classList.contains('reset-button')) {
            resetRace(e);
        }

        if (target.classList.contains('generate-button')) {
            generateCars(e);
        }

        if (target.classList.contains('close-button')) {
            messageWrapper.classList.remove('visible');
        }
    });
}

function renderSortButtons() {
    document.body.addEventListener('click', async (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('sort-wins')) {
            renderSorting(SortBy.Wins);
        }

        if (target.classList.contains('sort-time')) {
            renderSorting(SortBy.Time);
        }
    });
}
