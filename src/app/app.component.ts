import {Component} from '@angular/core';
import {StepTransporterService} from './step.transporter.service';
import {ApiError} from "./interface/apiError";

@Component({
    selector: 'app-root',
    template: `
        <div class="pitstop-style">
            <div class="step-container">
                <div *ngIf="stepTransporter.getErrors()">
                    <div *ngFor="let error of stepTransporter.getErrors(); let i = index;"
                         class="alert alert-danger alert-dismissable">
                        <a href="javascript:void(0)" (click)="closeError(i)" class="close">&times;</a>
                        {{error.getMessage()}}
                    </div>
                </div>
                <div class="stepwizard col-md-offset-3" *ngIf="!stepTransporter.order">
                    <div class="stepwizard-row setup-panel">
                        <div class="stepwizard-step">
                            <button routerLink="/step1" type="button" class="btn btn-default btn-circle"
                                    routerLinkActive="active">1
                            </button>
                            <p>Шаг 1</p>
                        </div>
                        <div class="stepwizard-step">
                            <button routerLink="/step2" type="button" class="btn btn-default btn-circle"
                                    [disabled]="isStep2ButtonDisabled()"
                                    routerLinkActive="active">2
                            </button>
                            <p>Шаг 2</p>
                        </div>
                        <div class="stepwizard-step">
                            <button routerLink="/step3" type="button" class="btn btn-default btn-circle"
                                    [disabled]="isStep3ButtonDisabled()" routerLinkActive="active">
                                3
                            </button>
                            <p>Шаг 3</p>
                        </div>
                    </div>
                </div>
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
})
export class AppComponent {
    constructor(public stepTransporter: StepTransporterService) {
    }

    isStep2ButtonDisabled() {
        return this.stepTransporter.isStep2ButtonDisabled();
    }

    isStep3ButtonDisabled(): boolean {
        return this.stepTransporter.isStep3ButtonDisabled();
    }

    closeError(index: number) {
        this.stepTransporter.removeError(index);
    }
}
