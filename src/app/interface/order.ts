import {ServiceTypeProduct} from './serviceTypeProduct';
import {ServiceTypeOption} from './serviceTypeOption';
import {Tsc} from './tsc';
import {User} from './user';
import {formattedPrice} from '../utils';

export class Order {
    order_id: number;
    private price: number;
    product: string;
    selected_options: Array<any> = [];
    address: string;
    enroll_date: string;
    user: User;

    constructor(order_id: number,
                price: number,
                product: ServiceTypeProduct,
                options: Array<ServiceTypeOption>,
                tsc: Tsc,
                user: User) {
        this.order_id = order_id;
        this.price = price;
        this.formatProductData(product);
        this.formatTscData(tsc);
        this.user = user;
        this.formatSelectedOptions(options);

    }

    getPrice(): string {
        return formattedPrice(this.price);
    }

    getName(): string {
        return this.product;
    }

    private formatProductData(product: ServiceTypeProduct) {
        this.product = product.name;
    }

    private formatTscData(tsc: Tsc) {
        this.address = tsc.name;
        this.enroll_date = tsc.getEnroll().getDate();
    }

    private formatSelectedOptions(options: Array<ServiceTypeOption>): void {
        const self = this;
        options.forEach(service_type_option => {
            if (service_type_option.getValues().length > 0) {
                const temp_selected_option_type = service_type_option.getSelectedValue();
                self.selected_options.push(
                    {
                        name: service_type_option.name,
                        chosen_value: temp_selected_option_type.name,
                    }
                );
            }
        });
    }
}
