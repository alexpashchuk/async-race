import { options, store } from '../data/state';
import { renderGarage, updateGarage } from '../view/garageView';
import { renderWinners, updateWinners } from '../view/winnersView';
import { View } from '../types/enums';

export default function renderPagination() {
    const prevPageButton = document.querySelector('.prev-button') as HTMLButtonElement;
    const nextPageButton = document.querySelector('.next-button') as HTMLButtonElement;
    const garageContainer = document.querySelector('.garage') as HTMLDivElement;
    const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;
    const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;
    const raceButton = document.querySelector('.race-button') as HTMLButtonElement;

    prevPageButton.addEventListener('click', async () => {
        if (options.view === View.Winners) {
            prevPageButton.disabled = true;
            store.winnersPage -= 1;
            await updateWinners();
            winnersContainer.innerHTML = renderWinners(store.winners);
        } else {
            store.carsPage -= 1;
            await updateGarage();
            garageContainer.innerHTML = renderGarage();
            raceButton.disabled = false;
            resetButton.disabled = true;
        }
    });

    nextPageButton.addEventListener('click', async () => {
        if (options.view === View.Winners) {
            nextPageButton.disabled = true;
            store.winnersPage += 1;
            await updateWinners();
            winnersContainer.innerHTML = renderWinners(store.winners);
        } else {
            store.carsPage += 1;
            await updateGarage();
            garageContainer.innerHTML = renderGarage();
            raceButton.disabled = false;
            resetButton.disabled = true;
        }
    });
}
