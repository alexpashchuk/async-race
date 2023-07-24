import { options, store } from '../data/state';
import { getWinners } from '../data/api';
import { renderCarImage } from './garageView';
import { setSortingSign } from '../utils/utils';
import { SortBy, SortOrder } from '../types/enums';
import { WinnerItems } from '../types/interfaces';

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
            <th class="sort-wins">WINS<p>${setSortingSign(SortBy.Wins)}</p></th>
            <th class="sort-time">BEST TIME<p>${setSortingSign(SortBy.Time)}</p></th>
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

const renderSorting = async (sort: string) => {
    const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;
    options.order = options.order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
    options.sort = sort;
    await updateWinners();
    winnersContainer.innerHTML = renderWinners(store.winners);
};

export { renderWinners, updateWinners, renderSorting };
