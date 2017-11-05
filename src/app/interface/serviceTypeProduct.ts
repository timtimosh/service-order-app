import {Tsc} from './tsc';
import {Step2Service} from '../step2/step2.service';
import {ServiceType} from './serviceType';
import {formattedPrice} from '../utils';
import {ApiError} from './apiError';

export class ServiceTypeProduct {
    id_product: number;
    name: string;
    price: number;
    childs: ServiceTypeProduct[] = [];
    tsc: Array<Tsc> = [];
    private chosen_by_user = false;
    private chosen_tsc: Tsc = null;

    constructor(id_product: number, name: string, price: number = 0) {
        this.id_product = id_product;
        this.name = name;
        this.price = price;
    }

    addChildProduct(product: ServiceTypeProduct) {
        this.childs.push(product);
    }

    getChildProducts(): Array<ServiceTypeProduct> {
        return this.childs;
    }

    setPrice(price: number) {
        this.price = price;
    }

    getPrice(): string {
        return formattedPrice(this.price);
    }

    hasChild(product: ServiceTypeProduct) {
        return this.getChildProducts().filter(child_product => child_product.id_product === product.id_product)[0];
    }

    setChosen(flag: boolean): void {
        this.chosen_by_user = flag;
    }

    isChosen(): boolean {
        return this.chosen_by_user === true;
    }

    setChosenTsc(tsc_id: number = 0) {
        if (this.chosen_tsc) {
            this.chosen_tsc.setChosen(false);
        }
        this.chosen_tsc = this.getTsc(tsc_id).setChosen(true);
    }

    getChosenTsc(): Tsc {
        return this.chosen_tsc;
    }

    addTsc(tsc: Tsc): void {
        this.tsc.push(tsc);
    }

    getTscList(): Array<Tsc> {
        return this.tsc;
    }

    getTsc(tsc_id: number = 0): Tsc | null {
        const searched_tsc = this.getTscList().filter(tsc => tsc.id_tsc === tsc_id);
        if (searched_tsc) {
            return searched_tsc[0];
        }
        return null;
    }

    loadTscListAccordingToDate(service: ServiceType, date: string, api: Step2Service): void {
        const self = this;
        api.getAvailableTscByParams(service, this, date)
            .then(
                function (response) {
                    self.tsc = [];
                    if (response instanceof ApiError) {
                        return;
                    }
                    response.forEach(tsc => {
                        self.addTsc(tsc);
                    });
                    if (self.getChosenTsc()) {
                        self.setChosenTsc(self.getChosenTsc().id_tsc);
                    }
                }
            );
    }
}
