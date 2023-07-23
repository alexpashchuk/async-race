import { renderGarage, updateGarage } from './garageView';
import { renderWinners, updateWinners } from './winnersView';
import { options, store } from '../data/state';
import { View } from '../types/enums';

export function appView() {
    document.body.innerHTML = `
    <div class="wrapper">
    ${renderHeader()}
     <main class="main">
            <div class="garage-view">
            <div class="controls">
             <div class="forms">
                <form class="form-create">
                  <input type="color" class="create-color" name="color" value="#40bd3e">
                  <input type="text" class="create-name" name="name" placeholder="Enter car name...">
                  <button type="submit" class="create-button button" disabled="">CREATE</button>
                </form>
                <form class="form-update">
                  <input type="color" class="update-color" name="color" disabled="" value="#40bd3e">
                  <input type="text" class="update-name" name="name" disabled="" placeholder="Enter car name...">
                  <button type="submit" class="update-button button" disabled="">UPDATE</button>
                </form>
              </div>
              <div class="race-controls">
                <button type="button" class="race-button">RACE</button>
                <button type="button" class="reset-button" disabled="">RESET</button>
                <button type="button" class="generate-button">GENERATE CARS</button>
              </div>
            </div>
              <div class="garage">${renderGarage()}</div>
              <div class="message-win">
                <p class="message"></p>
              </div>
            </div>
            <div class="winners-view hidden">${renderWinners(store.winners)}</div>
            <div class="pagination">
              <button type="button" class="prev-button">PREV</button>
              <button type="button" class="next-button">NEXT</button>
            </div>
      </main>
      ${renderFooter()}
    </div>
  `;
    toggleView();
}

function renderHeader() {
    return `
    <header class="header">
        <nav class="header-nav">
          <button type="button" class="garage-button">
            <p>&#8592</p>GARAGE</button>
          <button type="button" class="winners-button">WINNERS<p>&#8594</p></button>
        </nav>
    </header>
  `;
}

function renderFooter() {
    return `
    <footer class="footer">
        <div class="year-link"><a
            href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md">© 2023</a></div>
        <div class="footer-links">
          <a href="https://github.com/alexpashchuk" target="_blank" class="git-link">
            <img src="./assets/github.svg" alt="github">
          </a>
          <a href="https://rs.school/js/" target="_blank" class="rs-link">
            <img src="./assets/rs-school.svg" alt="rs-school">
          </a>
        </div>
    </footer>
 `;
}

function toggleView() {
    const garageButton = document.querySelector('.garage-button') as HTMLButtonElement;
    const winnersButton = document.querySelector('.winners-button') as HTMLButtonElement;
    const garageContainer = document.querySelector('.garage-view') as HTMLDivElement;
    const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;

    garageButton.addEventListener('click', async () => {
        winnersContainer.classList.add('hidden');
        garageContainer.classList.remove('hidden');
        options.view = View.Garage;
        updateGarage();
    });

    winnersButton.addEventListener('click', async () => {
        await updateWinners();
        garageContainer.classList.add('hidden');
        winnersContainer.classList.remove('hidden');
        winnersContainer.innerHTML = renderWinners(store.winners);
        options.view = View.Winners;
    });
}

export { toggleView };
