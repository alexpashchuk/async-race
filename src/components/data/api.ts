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

async function createCar(data: Car): Promise<Car> {
    const car = await fetch(GARAGE, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return car.json();
}

async function deleteCar(id: number): Promise<void> {
    await fetch(`${GARAGE}/${id}`, { method: HttpMethod.DELETE });
}

async function updateCar(id: number, data: Car): Promise<Car> {
    const response = await fetch(`${GARAGE}/${id}`, {
        method: HttpMethod.PUT,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
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

async function createWinner(data: Winner): Promise<Winner> {
    const response = await fetch(`${WINNERS}`, {
        method: HttpMethod.POST,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

async function getWinner(id: number): Promise<Winner> {
    const response = await fetch(`${WINNERS}/${id}`);
    return response.json();
}

export async function updateWinner(id: number, data: Winner): Promise<Winner> {
    const response = await fetch(`${WINNERS}/${id}`, {
        method: HttpMethod.PUT,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

async function getWinnerStatus(id: number): Promise<number> {
    return (await fetch(`${WINNERS}/${id}`)).status;
}

async function saveWinner(car: WinnerItems): Promise<void> {
    const id = car.car.id as number;
    const winnerStatus = await getWinnerStatus(id);
    if (winnerStatus === HttpStatus.NOT_FOUND) {
        const winnerSave: Winner = {
            id,
            wins: 1,
            time: car.time,
        };
        await createWinner(winnerSave);
    } else {
        const winner = await getWinner(id);
        const winnerSave: Winner = {
            id,
            wins: winner.wins + 1,
            time: car.time < winner.time ? car.time : winner.time,
        };
        await updateWinner(id, winnerSave);
    }
}
export {
    getCar,
    getCars,
    createCar,
    deleteCar,
    updateCar,
    stopEngine,
    startEngine,
    driveCar,
    getWinners,
    deleteWinner,
    saveWinner,
};
