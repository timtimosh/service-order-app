import {Component, OnInit} from '@angular/core';

import {Step1Service} from './step1.service';
import {StepTransporterService} from '../step.transporter.service';
import {ServiceTypeProduct} from '../interface/serviceTypeProduct';
import {ServiceContainer} from '../interface/serviceContainer';
import {Router} from '@angular/router';

@Component({
    selector: 'step1',
    templateUrl: './step1.component.html'
})
export class Step1Component implements OnInit {
    service_container: ServiceContainer = null;

    constructor(private step1Service: Step1Service,
                private stepTransporter: StepTransporterService,
                private router: Router) {
    }

    ngOnInit(): void {
        // try_to_load_saved_data_if_user_clicked_next_button
        const prev_data = this.stepTransporter.service_container;
        if (prev_data) {
            this.service_container = prev_data;
        } else {
            this.service_container = new ServiceContainer(this.step1Service);
        }
    }

    onServiceChanged(event) {
        const new_service_id = parseInt(event.target.value, 10);
        const new_active_service = this.service_container.getServices().filter(service => service.id_category === new_service_id)[0];
        this.service_container.setChosen(new_active_service);
    }

    onServiceTypeOptionValueChanged(option: number, event): void {
        const option_value = parseInt(event.target.value, 10);
        this.service_container.getChosen().getOption(option).setSelectedValue(option_value);
        this.service_container.updateProducts(this.service_container.getChosen());
    }

    onCurrentProductChange(product: ServiceTypeProduct) {
        this.service_container.getChosen().setChosenProduct(product.id_product);
        this.stepTransporter.service_container = this.service_container;
    }

    getCurrentGroupedProductOption(): Array<ServiceTypeProduct> {
        const grouped_products = [];
        const temp_grouped = [];
        // console.log('current product childs: ');
        // console.log( this.curent_service.getChildProducts() );
        this.service_container.getChosen().getProducts().forEach(service_product => {
            const product_childs = service_product.getChildProducts();
            for (let i = 0, len = product_childs.length; i < len; i++) {
                const product_child = product_childs[i];
                if (typeof temp_grouped[product_child.id_product] !== 'undefined') {
                    continue;
                }
                grouped_products.push(product_child);
                temp_grouped[product_child.id_product] = 1;
            }
        });
        return grouped_products;
    }

    onNextClick() {
        this.router.navigate(['step2']);
    }

    nextButtonDisabled() {
        return this.stepTransporter.isStep2ButtonDisabled();
    }
}
