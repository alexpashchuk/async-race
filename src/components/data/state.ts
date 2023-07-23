import { getCars, getWinners } from './api';
import { Animate } from '../types/interfaces';

const options = {
    sort: 'time',
    order: 'asc',
    view: 'garage',
};

const { cars, count: carsCount } = await getCars();
const { winners, count: winnersCount } = await getWinners();
const animation: Animate[] = [];

const store = {
    cars,
    carsCount,
    carsPage: 1,
    winnersPage: 1,
    winners,
    winnersCount,
    animation,
};

export { options, store };
