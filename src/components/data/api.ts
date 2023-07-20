import { CAR_IN_PAGE, GARAGE, WINNERS, WINNERS_IN_PAGE } from '../utils/constants';
import { Car, Cars, Winner, Winners } from '../types/interfaces';
import { HttpStatus } from '../types/enums';
import { getSortOrder } from '../utils/utils';
import { options } from './state';

async function getCar(id: number): Promise<Car> {
    const response: Response = await fetch(`${GARAGE}/${id}`);
    if (response.status !== HttpStatus.OK) throw new Error('There was an error fetching car by id');
    const car: Car = await response.json();
    return car;
}

async function getCars(page = 1, limit = CAR_IN_PAGE): Promise<Cars> {
    const response: Response = await fetch(`${GARAGE}?_limit=${limit}&_page=${page}`);
    if (response.status !== HttpStatus.OK) throw new Error('There was an error fetching cars data');

    const data: Car[] = await response.json();
    return {
        items: data,
        count: Number(response.headers.get('X-Total-Count')) || 0,
    };
}

async function getWinners(page = 1, limit = WINNERS_IN_PAGE): Promise<Winners> {
    const response = await fetch(
        `${WINNERS}?_page=${page}&_limit=${limit}${getSortOrder(options.sort, options.order)}`
    );
    if (response.status !== 200) throw new Error('There was an error fetching winners list');

    const data = await response.json();
    return {
        items: await Promise.all(
            data.map(async (winners: Winner) => ({
                ...winners,
                car: await getCar(winners.id as number),
            }))
        ),
        count: Number(response.headers.get('X-Total-Count')) || 0,
    };
}

export { getCar, getCars, getWinners };
