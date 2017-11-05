import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {Step1Component} from './step1/step1.component';
import {Step2Component} from './step2/step2.component';
import {Step3Component} from './step3/step3.component';
import {Step1Service} from './step1/step1.service';
import {StepTransporterService} from './step.transporter.service';
import {Step2Service} from './step2/step2.service';
import {Step3Service} from './step3/step3.service';
import {AgmCoreModule} from '@agm/core';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {MyDatePickerModule} from 'mydatepicker';
import {ValidationService} from './step3/form/validation/validation.service';
import {ControllMessagesComponent} from './step3/form/validation/controll-messages.component';
import {Step4Component} from './step4/step4.component';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
    declarations: [
        AppComponent, Step1Component, Step2Component, Step3Component, Step4Component, ControllMessagesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCtVEm40m7K_Ra1UpY5efe8m_ozUfL3FTA'
        }),
        AgmSnazzyInfoWindowModule,
        MyDatePickerModule,
        TextMaskModule
    ],
    providers: [Step1Service, Step2Service, Step3Service, StepTransporterService, ValidationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
