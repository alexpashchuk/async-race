import { appView } from '../view/appView';
import renderButtonEvents from '../controller/buttonsController';
import renderForms from '../controller/formsController';

export function app() {
    appView();
    renderButtonEvents();
    renderForms();
}
