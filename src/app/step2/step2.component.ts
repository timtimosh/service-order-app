import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StepTransporterService} from '../step.transporter.service';
import {Step2Service} from './step2.service';
import {ServiceType} from '../interface/serviceType';
import {ServiceTypeProduct} from '../interface/serviceTypeProduct';
import {Tsc} from '../interface/tsc';
import {TscTime} from '../interface/tscTime';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

@Component({
    selector: 'step2',
    templateUrl: './step2.component.html'
})
export class Step2Component implements OnInit {
    product: ServiceTypeProduct;
    service: ServiceType;
    map_center_lat = 55.75;
    map_center_lng = 37.35;
    map_zoom = 9;

    myDatePickerOptions: IMyDpOptions;
    datapicker_model: any;

    constructor(private router: Router, private step2Service: Step2Service, private stepTransporter: StepTransporterService) {
        if (this.stepTransporter.isStep2ButtonDisabled()) {
            this.router.navigate(['/step1']);
            return;
        }
        this.initDataFromStep1();
        this.initDataPicker();
    }


    private initDataFromStep1(): void {
        this.service = this.stepTransporter.service_container.getChosen();
        this.product = this.service.getChosenProduct();
    }

    ngOnInit(): void {
        if (this.product.getTscList().length === 0) {
            this.product.loadTscListAccordingToDate(this.service, '', this.step2Service);
        }
    }

    onCurrentTscChange(tsc_chosen: Tsc) {
        this.product.setChosenTsc(tsc_chosen.id_tsc);
        this.map_center_lat = tsc_chosen.lat;
        this.map_center_lng = tsc_chosen.lng;
        this.map_zoom = 13;
    }

    onChosenTscChooseTime(tsc_time_chosen: TscTime) {
        this.product.getChosenTsc().enroll(tsc_time_chosen);
    }

    mapClickedMarker(tsc: Tsc) {
        this.product.setChosenTsc(tsc.id_tsc);
    }

    onDatapickerDateChange(event: IMyDateModel) {
        if (this.product.getChosenTsc()) {
            this.product.loadTscListAccordingToDate(this.service, event.formatted, this.step2Service);
        }
    }

    private initDataPicker(): void {
        const date = new Date();
        this.datapicker_model = {
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        };

        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'yyyy-mm-dd',
        };
    }
    nextButtonDisabled() {
        return this.stepTransporter.isStep3ButtonDisabled();
    }
}
