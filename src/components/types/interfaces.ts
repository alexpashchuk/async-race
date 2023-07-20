interface Car {
    id?: number;
    name: string;
    color: string;
    isEngineStarted?: boolean;
}

interface Cars {
    items: Car[];
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
    items: WinnerItems[];
    count: number;
}

export { Car, Cars, Winner, Winners, WinnerItems };
