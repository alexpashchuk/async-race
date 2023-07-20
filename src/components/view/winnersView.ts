import { renderCarImage } from './garageView';
import { store } from '../data/state';
import { WinnerItems, Winners } from '../types/interfaces';

function renderWinners(winners: WinnerItems[]) {
    return `
      <h1>WINNERS (<span class="winners-count">${store.winnersCount}</span>)</h1>
      <h2>PAGE ${store.winnersPage}</h2>
      <table class="table">
        <thead>
          <tr>
            <th>№</th>
            <th>CAR</th>
            <th>MODEL</th>
            <th class="table-sort">WINS</th>
            <th class="table-sort">BEST TIME</th>
          </tr>
        </thead>
        <tbody>
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

export { renderWinners };
