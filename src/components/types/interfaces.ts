interface Car {
    id?: number;
    name: string;
    color: string;
}

interface Cars {
    cars: Car[];
    count: number;
}

interface Winner {
    id: number;
    time: number;
    wins: number;
}

type WinnerItems = {
    id?: number;
    wins?: number;
    time: number;
    car: Car;
};

interface Winners {
    winners: WinnerItems[];
    count: number;
}

interface Engine {
    velocity: number;
    distance: number;
}

interface RacingCar {
    id: number;
    success?: boolean;
    time: number;
}

interface Animate {
    id?: number;
}

export { Car, Cars, Winner, Winners, WinnerItems, Animate, Engine, RacingCar };
