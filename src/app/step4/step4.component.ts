import {Component} from '@angular/core';
import {StepTransporterService} from '../step.transporter.service';
import {Router} from '@angular/router';
import {Order} from '../interface/order';

@Component({
    selector: 'step4',
    templateUrl: './step4.component.html'
})
export class Step4Component {
    order: Order = null;

    constructor(private transporter: StepTransporterService,
                private router: Router) {
        this.transporter.service_container = null;
        this.order = this.transporter.order;
        if (!this.order) {
            this.goBackMakeNewOrder();
        }
    }

    goBackMakeNewOrder() {
        this.transporter.order = null;
        this.router.navigate(['/step1']);
    }
}

