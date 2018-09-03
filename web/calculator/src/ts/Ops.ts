import { IOps } from "./interfaces/IOps";

class Ops implements IOps {
    add(x: number, y: number): number {
        return x + y;
    }
    subtract(x: number, y: number): number {
        return x - y;
    }
    multiply(x: number, y: number): number {
        return x * y;
    }
    divide(x: number, y: number): number {
        if (y === 0) return 0;
        return x / y;
    }
    plusMinus(x: number): number {
        return (-1) * x;
    }
}

export default Ops;