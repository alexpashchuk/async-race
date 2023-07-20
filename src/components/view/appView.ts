import { renderGarage } from './garageView';
import { renderWinners } from './winnersView';
import { store } from '../data/state';

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
              <button type="button" class="prev-button" disabled="">PREV</button>
              <button type="button" class="next-button" disabled="">NEXT</button>
            </div>
      </main>
      ${renderFooter()}
    </div>
  `;
}

function renderHeader() {
    return `
    <header class="header">
        <nav class="header-nav">
          <button type="button" class="garage-button">
            <span>«</span> GARAGE</button>
          <button type="button" class="winners-button">WINNERS <span>»</span></button>
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
