import { COUNT_RANDOM_CAR, COUNT_RANDOM_COLOR, HEX_LETTERS } from './constants';
import { options } from '../data/state';
import { SortOrder } from '../types/enums';

const getRandomName = (): string => {
    const names = [
        'Acura',
        'Audi',
        'BMW',
        'Citroen',
        'Chevrolet',
        'Ford',
        'Honda',
        'Hyundai',
        'Kia',
        'Mazda',
        'Mitsubishi',
        'Opel',
        'Skoda',
        'Toyota',
        'Renault',
        'Volkswagen',
    ];
    const models = [
        'RSX',
        'Q5',
        'X5',
        'C3',
        'Camaro',
        'Fiesta',
        'Accord',
        'Creta',
        'Sportage',
        'CX-60',
        'Lancer',
        'Astra',
        'Rapid',
        'Camry',
        'Arkana',
        'Touareg',
    ];

    const nameIndex = Math.floor(Math.random() * names.length);
    const modelIndex = Math.floor(Math.random() * models.length);

    return `${names[nameIndex]} ${models[modelIndex]}`;
};

const getRandomColor = (): string => {
    let color = '#';

    for (let i = 0; i < COUNT_RANDOM_COLOR; i += 1) {
        color += HEX_LETTERS[Math.floor(Math.random() * 16)];
    }

    return color;
};

function generateRandomCar(carCount = COUNT_RANDOM_CAR) {
    return new Array(carCount).fill(1).map(() => ({ name: getRandomName(), color: getRandomColor() }));
}

function getSortOrder(sort?: string | null, order?: string | null) {
    if (sort && order) return `&_sort=${sort}&_order=${order}`;
    return '';
}

const setSortingSign = (sort: string) => {
    if (options.sort === sort) {
        return options.order === SortOrder.Asc ? ' &#8593' : ' &#8595';
    }
    return '';
};

function getPosition(element: HTMLElement) {
    const { top, left, width, height } = element.getBoundingClientRect();

    return {
        x: left + width / 2,
        y: top + height / 2,
    };
}

function getDistance(firstEl: HTMLElement, secondEl: HTMLElement) {
    const aPosition = getPosition(firstEl);
    const bPosition = getPosition(secondEl);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export { generateRandomCar, getSortOrder, setSortingSign, getDistance };
