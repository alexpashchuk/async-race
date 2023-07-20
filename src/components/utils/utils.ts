import { COUNT_RANDOM_CAR, COUNT_RANDOM_COLOR, HEX_LETTERS } from './constants';

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

const getSortOrder = (sort?: string | null, order?: string | null) => {
    if (sort && order) return `&_sort=${sort}&_order=${order}`;
    return '';
};

export { generateRandomCar, getSortOrder };
