import { renderCarImage } from './garageView';
import { store } from '../data/state';
import { WinnerItems } from '../types/interfaces';
import { getWinners } from '../data/api';

function renderWinners(winners: WinnerItems[]) {
    return `
      <h1>WINNERS (<span class="winners-count">${store.winnersCount}</span>)</h1>
      <h2>PAGE ${store.winnersPage}</h2>
      <table class="table">
        <thead class="table-head">
          <tr>
            <th>№</th>
            <th>CAR</th>
            <th>MODEL</th>
            <th class="table-sort">WINS</th>
            <th class="table-sort">BEST TIME</th>
          </tr>
        </thead>
        <tbody class="table-body">
        ${winners
            .map(
                (winner, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${renderCarImage(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time.toFixed(2)}</td>
        </tr>`
            )
            .join('')}
        </tbody>
      </table>
`;
}

async function updateWinners() {
    const nextPage = document.querySelector('.next-button') as HTMLButtonElement;
    const prevPage = document.querySelector('.prev-button') as HTMLButtonElement;
    const { winners, count } = await getWinners(store.winnersPage);
    store.winners = winners;
    store.winnersCount = Number(count);
    nextPage.disabled = store.winnersPage * 10 >= store.winnersCount;
    prevPage.disabled = store.winnersPage <= 1;
}

export { renderWinners, updateWinners };
