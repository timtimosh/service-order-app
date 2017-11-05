import {DatePipe} from '@angular/common';

export class TscTime {
    date: string;
    timestamp: string;
    timezone_type: number;
    timezone: string;
    private available = false;
    private chosen = false;

    constructor(date: string, available: boolean, timezone_type: number, timezone = 'UTC') {
        this.date = this.generateDate(date, timezone_type);
        this.timestamp = date;
        this.available = available;
        this.timezone_type = timezone_type;
        this.timezone = timezone;
    }

    private generateDate(timestamp: string, timezone_type: number): string {
        const date = new Date(timestamp);
        return new DatePipe('en').transform(date, 'H:mm');
    }

    isAviable(): boolean {
        return this.available === true;
    }

    isChosen(): boolean {
        return this.chosen === true;
    }

    setChoosen(flag: boolean): this {
        this.chosen = flag;
        return this;
    }

    getDate(): string {
        const date = new Date(this.timestamp);
        return new DatePipe('en').transform(date, 'yyyy-MM-dd H:mm');
    }
}
