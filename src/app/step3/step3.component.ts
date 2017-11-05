import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StepTransporterService} from '../step.transporter.service';
import {Step3Service} from './step3.service';
import {ServiceType} from '../interface/serviceType';
import {ServiceTypeProduct} from '../interface/serviceTypeProduct';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from './form/validation/validation.service';
import {User} from '../interface/user';
import {Order} from '../interface/order';
import {ApiError} from '../interface/apiError';

@Component({
    selector: 'step3',
    templateUrl: './step3.component.html'
})
export class Step3Component implements OnInit {
    product: ServiceTypeProduct;
    service: ServiceType;
    orderForm: any = null;
    user: User;
    public mask = ['+', '7', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private step3Service: Step3Service,
                private stepTransporter: StepTransporterService) {
        if (this.stepTransporter.isStep3ButtonDisabled()) {
            this.router.navigate(['/step2']);
            return;
        }
        this.initDataFromStep2();
        this.formBuild();
    }

    private initDataFromStep2(): void {
        this.service = this.stepTransporter.service_container.getChosen();
        this.product = this.service.getChosenProduct();
        this.user = this.stepTransporter.user_info;
    }

    ngOnInit(): void {

    }

    makeOrder() {
        const self = this;
        this.step3Service.sendOrder()
            .then(
                function (response) {
                    if (response instanceof ApiError) {
                        return;
                    }
                    self.stepTransporter.order = self.createNewOrder(212);
                    self.router.navigate(['/step4']);
                }
            );
    }

    private createNewOrder(order_id: number): Order {
        const price = this.product.getChosenTsc().price;
        const product = this.product;
        const options = this.service.getOptions();
        const tsc = this.product.getChosenTsc();
        const order = new Order(
            order_id,
            price,
            product,
            options,
            tsc,
            this.user
        );
        return order;
    }

    /**
     * Returns a deep copy of the object
     */

    private formBuild() {
        this.orderForm = this.formBuilder.group({
            'name': [this.user.name, [Validators.required, ValidationService.nameValidator]],
            'email': [this.user.email, [Validators.required, ValidationService.emailValidator]],
            'phone': [this.user.phone, [Validators.required, ValidationService.phoneValidator]]
        });
    }
}

