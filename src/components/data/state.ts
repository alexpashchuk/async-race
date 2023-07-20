import { getCars, getWinners } from './api';
import { SortBy, SortOrder } from '../types/enums';

const options = {
    sort: SortBy.Time,
    order: SortOrder.Asc,
};

const { items: cars, count: carsCount } = await getCars();
const { items: winners, count: winnersCount } = await getWinners();

const store = {
    cars,
    carsCount,
    carsPage: 1,
    winnersPage: 1,
    winners,
    winnersCount,
};

export { options, store };
