import { createCar } from '../data/api';
import { renderGarage, updateGarage } from '../view/garageView';
import { generateRandomCar } from '../utils/utils';

export default async function generateCars(e: Event) {
    const target = e.target as HTMLButtonElement;
    const garageContainer = document.querySelector('.garage') as HTMLDivElement;
    target.disabled = true;
    const cars = generateRandomCar();
    await Promise.all(
        cars.map(async (car) => {
            const newCar = await createCar(car);
            return newCar;
        })
    );
    await updateGarage();
    garageContainer.innerHTML = renderGarage();
    target.disabled = false;
}
