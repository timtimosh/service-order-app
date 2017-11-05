import {TscTime} from './tscTime';
import {formattedPrice} from '../utils';

export class Tsc {
    time: TscTime[] = [];
    name: string;
    id_tsc: number;
    phone: string;
    photo: string;
    lat: number;
    lng: number;
    price = 0;
    private chosen = false;
    private chosen_time: TscTime = null;

    constructor(id_tsc: number, lat: number, lng: number, name: string, phone: string, photo: string) {
        this.id_tsc = id_tsc;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

    getTime(): Array<TscTime> {
        return this.time;
    }

    addTime(time: TscTime): void {
        this.time.push(time);
    }

    getEnroll(): TscTime {
        return this.chosen_time;
    }

    enroll(time: TscTime) {
        if (this.getEnroll()) {
            this.getEnroll().setChoosen(false);
        }
        this.chosen_time = time.setChoosen(true);
    }

    setPrice(price: number = 0): void {
        this.price = price;
    }

    getPrice(): string {
        return formattedPrice(this.price);
    }

    isChosen(): boolean {
        return this.chosen === true;
    }

    setChosen(flag: boolean): Tsc {
        this.chosen = flag;
        return this;
    }
}
