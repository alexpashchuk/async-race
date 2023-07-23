import { CAR_IN_PAGE, ENGINE, FIRST_PAGE, GARAGE, WINNERS, WINNERS_IN_PAGE } from '../utils/constants';
import { Car, Cars, Engine, Winner, WinnerItems, Winners } from '../types/interfaces';
import { CarStatus, HttpMethod, HttpStatus } from '../types/enums';
import { getSortOrder } from '../utils/utils';
import { options } from './state';

async function getCar(id: number): Promise<Car> {
    const response: Response = await fetch(`${GARAGE}/${id}`);
    return response.json();
}

async function getCars(page = FIRST_PAGE, limit = CAR_IN_PAGE): Promise<Cars> {
    const response: Response = await fetch(`${GARAGE}?_limit=${limit}&_page=${page}`);
    const data: Car[] = await response.json();
    return {
        cars: data,
        count: Number(response.headers.get('X-Total-Count')) || 0,
    };
}

async function deleteCar(id: number): Promise<void> {
    await fetch(`${GARAGE}/${id}`, { method: HttpMethod.DELETE });
}

async function startEngine(id: number): Promise<Engine> {
    const response = await fetch(`${ENGINE}?id=${id}&status=${CarStatus.START}`, {
        method: HttpMethod.PATCH,
    });
    return response.json();
}

async function stopEngine(id: number): Promise<Engine> {
    const response = await fetch(`${ENGINE}?id=${id}&status=${CarStatus.STOP}`, {
        method: HttpMethod.PATCH,
    });
    return response.json();
}

async function driveCar(id: number): Promise<{ success: boolean }> {
    const response = await fetch(`${ENGINE}?id=${id}&status=${CarStatus.DRIVE}`, {
        method: HttpMethod.PATCH,
    }).catch();

    return response.status !== HttpStatus.OK ? { success: false } : { ...(await response.json()) };
}

async function deleteWinner(id: number): Promise<void | WinnerItems> {
    const { winners } = await getWinners();
    if (winners.some((item) => item.id === Number(id))) {
        const response = await fetch(`${WINNERS}/${id}`, { method: HttpMethod.DELETE });
        return response.json();
    }
    return undefined;
}

async function getWinners(page = FIRST_PAGE, limit = WINNERS_IN_PAGE): Promise<Winners> {
    const response = await fetch(
        `${WINNERS}?_page=${page}&_limit=${limit}${getSortOrder(options.sort, options.order)}`
    );

    const data = await response.json();
    return {
        winners: await Promise.all(
            data.map(async (winners: Winner) => ({
                ...winners,
                car: await getCar(winners.id as number),
            }))
        ),
        count: Number(response.headers.get('X-Total-Count')) || 0,
    };
}

export { getCar, getCars, deleteCar, deleteWinner, getWinners, startEngine, stopEngine, driveCar };
