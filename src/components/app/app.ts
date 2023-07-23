import { appView } from '../view/appView';
import renderButtonEvents from '../controller/buttonsController';

export function app() {
    appView();
    renderButtonEvents();
}
