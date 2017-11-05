import {ServiceTypeOption} from './serviceTypeOption';
import {ServiceTypeProduct} from './serviceTypeProduct';
import {Step1Service} from '../step1/step1.service';
import {ServiceTypeOptionValue} from './serviceTypeOptionValue';

export class ServiceType {
    id_category: number;
    name: string;
    options: ServiceTypeOption[] = [];
    private child_products: ServiceTypeProduct[] = [];
    private selected_by_user = false;
    private chosen_product: ServiceTypeProduct = null;

    constructor(id_category: number, name: string) {
        this.id_category = id_category;
        this.name = name;
    }

    /**
     * make service active if user select this service from dropdown menu and on app start
     * @param {boolean} flag
     * @param {Step1Service} api_service
     */
    setSelectedByUser(flag: boolean): void {
        this.selected_by_user = flag;
        // we don't need to update child products if user turns off this service
        if (flag === false) {
            return;
        }
        this.getOptions().forEach(option => {
            if (option.getValues().length > 0) {
                option.setSelectedValue(option.getValues()[0].id_attr_val);
            }
        });
    }

    isSelectedByUser(): boolean {
        return this.selected_by_user === true;
    }

    getOptions(): Array<ServiceTypeOption> {
        return this.options;
    }

    getOption(id_attribute: number): ServiceTypeOption {
        return this.getOptions().filter(option => option.id_attribute === id_attribute)[0];
    }

    addOption(option: ServiceTypeOption) {
        this.options.push(option);
    }

    /*   getOptionValue(option: ServiceTypeOption, id_attr_val: number): ServiceTypeOptionValue {
           let option_value;
           for (let i = 0, len = option.getValues().length; i < len; i++) {
               const temp_option_value = option.getValues()[i];
               if (temp_option_value.id_attr_val === id_attr_val) {
                   option_value = temp_option_value;
                   break;
               }
           }
           return option_value;
       }*/
    getProducts(): Array<ServiceTypeProduct> {
        return this.child_products;
    }

    addProduct(product: ServiceTypeProduct) {
        this.child_products.push(product);
    }

    removeAllProducts(): void {
        this.child_products = [];
        this.chosen_product = null;
    }

    getProductById(product_id: number): ServiceTypeProduct {
        return this.getProducts().filter(product => product.id_product === product_id)[0];
    }

    getChosenProduct(): ServiceTypeProduct | null {
        return this.chosen_product;
        /*const chosen_product = this.getProducts().filter(product => product.isChosen() === true);
        if (chosen_product) {
            return chosen_product[0];
        }
        return null;*/
    }

    setChosenProduct(product_id: number): void {
        if (this.getChosenProduct()) {
            this.getChosenProduct().setChosen(false);
        }
        const new_chosen_product = this.getProductById(product_id)
        new_chosen_product.setChosen(true);
        this.chosen_product = new_chosen_product;
    }
}
